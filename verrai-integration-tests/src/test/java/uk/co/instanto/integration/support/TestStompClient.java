package uk.co.instanto.integration.support;

import dev.verrai.rpc.common.transport.stomp.StompClient;
import dev.verrai.rpc.common.transport.stomp.StompMessage;
import dev.verrai.rpc.common.transport.stomp.StompSubscriptionCallback;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ConcurrentHashMap;

/**
 * A robust STOMP client for JVM-based integration tests using Testcontainers.
 */
public class TestStompClient implements StompClient {
    private static final Logger logger = LoggerFactory.getLogger(TestStompClient.class);

    private final String host;
    private final int port;
    private final String login;
    private final String passcode;
    private Socket socket;
    private BufferedOutputStream out;
    private BufferedInputStream in;
    private final Map<String, List<StompSubscriptionCallback>> subscriptions = new ConcurrentHashMap<>();
    private volatile boolean connected = false;
    private Thread readerThread;

    public TestStompClient(String host, int port) {
        this(host, port, null, null);
    }

    public TestStompClient(String host, int port, String login, String passcode) {
        this.host = host;
        this.port = port;
        this.login = login;
        this.passcode = passcode;
    }

    public void connect() {
        try {
            socket = new Socket(host, port);
            out = new BufferedOutputStream(socket.getOutputStream());
            in = new BufferedInputStream(socket.getInputStream());

            Map<String, String> headers = new HashMap<>();
            headers.put("accept-version", "1.1,1.0");
            headers.put("host", host);
            if (login != null) headers.put("login", login);
            if (passcode != null) headers.put("passcode", passcode);

            sendFrame("CONNECT", headers, null);

            // Read CONNECTED frame synchronously
            StompFrame frame = readFrame();
            if (frame != null && "CONNECTED".equals(frame.command)) {
                connected = true;
                logger.info("Connected to STOMP broker at {}:{}", host, port);
                startReaderLoop();
            } else {
                throw new IOException("Failed to connect. Expected CONNECTED, got: " + (frame != null ? frame.command : "null"));
            }

        } catch (IOException e) {
            throw new RuntimeException("Could not connect to STOMP broker", e);
        }
    }

    private void startReaderLoop() {
        readerThread = new Thread(() -> {
            try {
                while (connected && !socket.isClosed()) {
                    StompFrame frame = readFrame();
                    if (frame == null) {
                        // Socket closed or stream ended
                        break;
                    }
                    if ("MESSAGE".equals(frame.command)) {
                        String dest = frame.headers.get("destination");
                        if (dest != null) {
                            List<StompSubscriptionCallback> callbacks = subscriptions.get(dest);
                            if (callbacks != null) {
                                StompMessage msg = new StompMessage() {
                                    @Override
                                    public String getBody() {
                                        return frame.body;
                                    }

                                    @Override
                                    public Map<String, String> getHeaders() {
                                        return frame.headers;
                                    }
                                };
                                for (StompSubscriptionCallback callback : callbacks) {
                                    try {
                                        callback.onMessage(msg);
                                    } catch (Exception e) {
                                        logger.error("Error in STOMP callback", e);
                                    }
                                }
                            }
                        }
                    } else if ("ERROR".equals(frame.command)) {
                         logger.error("Received STOMP ERROR: {}", frame.body);
                    }
                }
            } catch (IOException e) {
                if (connected) {
                    logger.error("Error reading from STOMP socket", e);
                }
            } finally {
                connected = false;
            }
        }, "StompReader-" + port);
        readerThread.start();
    }

    // Basic STOMP frame reader
    private StompFrame readFrame() throws IOException {
        ByteArrayOutputStream commandBuf = new ByteArrayOutputStream();
        int b;

        // Skip leading newlines (heartbeats)
        while ((b = in.read()) != -1) {
            if (b == '\n' || b == '\r') {
                 if (commandBuf.size() > 0) {
                     break;
                 }
                 continue;
            }
            commandBuf.write(b);
        }

        if (b == -1 && commandBuf.size() == 0) {
            return null; // EOF
        }

        String command = new String(commandBuf.toByteArray(), StandardCharsets.UTF_8);

        Map<String, String> headers = new HashMap<>();
        // Read headers
        ByteArrayOutputStream lineBuf = new ByteArrayOutputStream();
        while ((b = in.read()) != -1) {
            if (b == '\n') {
                String line = new String(lineBuf.toByteArray(), StandardCharsets.UTF_8);
                lineBuf.reset();
                if (line.trim().isEmpty()) {
                    // Empty line marks end of headers
                    break;
                }
                int colon = line.indexOf(':');
                if (colon > 0) {
                     headers.put(line.substring(0, colon), line.substring(colon + 1));
                }
            } else {
                lineBuf.write(b);
            }
        }

        // Read body
        // Check for content-length
        String lenStr = headers.get("content-length");
        String body;
        if (lenStr != null) {
            int len = Integer.parseInt(lenStr);
            byte[] bodyBytes = new byte[len];
            int read = 0;
            while (read < len) {
                int r = in.read(bodyBytes, read, len - read);
                if (r == -1) throw new IOException("Unexpected EOF reading body");
                read += r;
            }
            body = new String(bodyBytes, StandardCharsets.UTF_8);
            // Read trailing NULL
            in.read();
        } else {
            // Read until NULL
            ByteArrayOutputStream bodyBuf = new ByteArrayOutputStream();
            while ((b = in.read()) != -1) {
                if (b == 0) break;
                bodyBuf.write(b);
            }
            body = new String(bodyBuf.toByteArray(), StandardCharsets.UTF_8);
        }

        return new StompFrame(command, headers, body);
    }

    @Override
    public boolean isConnected() {
        return connected;
    }

    @Override
    public void send(String destination, String body) {
        Map<String, String> headers = new HashMap<>();
        headers.put("destination", destination);
        try {
            sendFrame("SEND", headers, body);
        } catch (IOException e) {
            throw new RuntimeException("Failed to send STOMP message", e);
        }
    }

    @Override
    public void subscribe(String destination, StompSubscriptionCallback callback) {
        boolean first = !subscriptions.containsKey(destination);
        subscriptions.computeIfAbsent(destination, k -> new CopyOnWriteArrayList<>()).add(callback);

        if (first) {
            Map<String, String> headers = new HashMap<>();
            headers.put("destination", destination);
            headers.put("id", "sub-" + destination.hashCode());
            try {
                sendFrame("SUBSCRIBE", headers, null);
            } catch (IOException e) {
                 throw new RuntimeException("Failed to subscribe", e);
            }
        }
    }

    public void close() {
        connected = false;
        try {
            if (socket != null) socket.close();
        } catch (IOException e) {
            // ignore
        }
    }

    private synchronized void sendFrame(String command, Map<String, String> headers, String body) throws IOException {
        out.write(command.getBytes(StandardCharsets.UTF_8));
        out.write('\n');
        for (Map.Entry<String, String> entry : headers.entrySet()) {
            out.write((entry.getKey() + ":" + entry.getValue()).getBytes(StandardCharsets.UTF_8));
            out.write('\n');
        }
        out.write('\n'); // End of headers
        if (body != null) {
            out.write(body.getBytes(StandardCharsets.UTF_8));
        }
        out.write(0); // NULL byte
        out.flush();
    }

    private static class StompFrame {
        String command;
        Map<String, String> headers;
        String body;

        public StompFrame(String command, Map<String, String> headers, String body) {
            this.command = command;
            this.headers = headers;
            this.body = body;
        }
    }
}
