package uk.co.instanto.demo;

import org.junit.Test;
import java.io.*;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import static org.junit.Assert.*;

public class StompBodyParsingTest {

    @Test
    public void testBodyWithContentLengthContainingNull() throws Exception {
        int port = 40000 + (int) (Math.random() * 10000);
        StompRelayServer server = new StompRelayServer(port);
        server.start();

        try {
            // Consumer
            CountDownLatch received = new CountDownLatch(1);
            final byte[][] receivedBody = new byte[1][];

            Thread consumer = new Thread(() -> {
                try (Socket socket = new Socket("localhost", port);
                     InputStream in = socket.getInputStream();
                     OutputStream out = socket.getOutputStream()) {

                    sendFrame(out, "CONNECT", "", null);
                    readFrame(in); // CONNECTED

                    sendFrame(out, "SUBSCRIBE", "destination:/topic/test\nid:0", null);

                    // Read MESSAGE
                    Frame frame = readFrame(in);
                    receivedBody[0] = frame.body;
                    received.countDown();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            consumer.start();

            Thread.sleep(500); // Wait for subscription

            // Producer
            try (Socket socket = new Socket("localhost", port);
                 OutputStream out = socket.getOutputStream()) {
                sendFrame(out, "CONNECT", "", null);
                // Send body with NULL byte: "hello\0world"
                byte[] body = "hello\0world".getBytes(StandardCharsets.UTF_8);
                sendFrame(out, "SEND", "destination:/topic/test\ncontent-length:" + body.length, body);
            }

            assertTrue(received.await(5, TimeUnit.SECONDS));
            assertNotNull(receivedBody[0]);
            // Existing implementation stops at \0 so body would be "hello" (5 bytes)
            // Correct implementation should be "hello\0world" (11 bytes)
            assertArrayEquals("hello\0world".getBytes(StandardCharsets.UTF_8), receivedBody[0]);

        } finally {
            server.stop();
        }
    }

    @Test
    public void testBodyWithoutContentLength() throws Exception {
        final int port = 40000 + (int) (Math.random() * 10000);

        StompRelayServer server = new StompRelayServer(port);
        server.start();

        try {
            // Consumer
            CountDownLatch received = new CountDownLatch(1);
            final byte[][] receivedBody = new byte[1][];

            Thread consumer = new Thread(() -> {
                try (Socket socket = new Socket("localhost", port);
                     InputStream in = socket.getInputStream();
                     OutputStream out = socket.getOutputStream()) {

                    sendFrame(out, "CONNECT", "", null);
                    readFrame(in); // CONNECTED

                    sendFrame(out, "SUBSCRIBE", "destination:/topic/legacy\nid:1", null);

                    // Read MESSAGE
                    Frame frame = readFrame(in);
                    receivedBody[0] = frame.body;
                    received.countDown();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            consumer.start();

            Thread.sleep(500);

            // Producer
            try (Socket socket = new Socket("localhost", port);
                 OutputStream out = socket.getOutputStream()) {
                sendFrame(out, "CONNECT", "", null);
                byte[] body = "simple text".getBytes(StandardCharsets.UTF_8);
                // No content-length
                sendFrame(out, "SEND", "destination:/topic/legacy", body);
            }

            assertTrue(received.await(5, TimeUnit.SECONDS));
            assertNotNull(receivedBody[0]);
            assertArrayEquals("simple text".getBytes(StandardCharsets.UTF_8), receivedBody[0]);

        } finally {
            server.stop();
        }
    }

    // Helpers
    private void sendFrame(OutputStream out, String command, String headers, byte[] body) throws IOException {
        out.write((command + "\n").getBytes(StandardCharsets.UTF_8));
        if (!headers.isEmpty()) {
            out.write((headers + "\n").getBytes(StandardCharsets.UTF_8));
        }
        out.write('\n'); // End of headers
        if (body != null) {
            out.write(body);
        }
        out.write(0); // NULL terminator
        out.flush();
    }

    // Very basic frame reader for test verification
    private Frame readFrame(InputStream in) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int b;
        // Read command
        while ((b = in.read()) != '\n') {
            buffer.write(b);
        }
        String command = buffer.toString("UTF-8").trim();
        buffer.reset();

        // Read headers
        int contentLength = -1;
        while (true) {
            int last = -1;
            while ((b = in.read()) != '\n') {
                buffer.write(b);
                last = b;
            }
            if (buffer.size() == 0 || (buffer.size() == 1 && buffer.toByteArray()[0] == '\r')) {
                 // Empty line
                 buffer.reset();
                 break;
            }
            String line = buffer.toString("UTF-8").trim();
            if (line.startsWith("content-length:")) {
                contentLength = Integer.parseInt(line.substring(15).trim());
            }
            buffer.reset();
        }

        // Read body
        byte[] body;
        if (contentLength >= 0) {
            body = new byte[contentLength];
            int read = 0;
            while (read < contentLength) {
                int c = in.read(body, read, contentLength - read);
                if (c == -1) throw new EOFException();
                read += c;
            }
            // Read NULL
            in.read();
        } else {
            // Read until NULL
            while ((b = in.read()) != 0) {
                buffer.write(b);
            }
            body = buffer.toByteArray();
        }

        return new Frame(command, body);
    }

    static class Frame {
        String command;
        byte[] body;
        Frame(String c, byte[] b) { command = c; body = b; }
    }
}
