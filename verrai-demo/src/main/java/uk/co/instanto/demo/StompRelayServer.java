package uk.co.instanto.demo;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.*;
import java.util.concurrent.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A very simple, minimal STOMP relay server for demo purposes.
 * Supports: CONNECT, SEND, SUBSCRIBE, MESSAGE.
 */
public class StompRelayServer {
    private static final Logger logger = LoggerFactory.getLogger(StompRelayServer.class);

    private final int port;
    private final Map<String, List<ClientHandler>> subscriptions = new ConcurrentHashMap<>();
    private final ExecutorService executor = Executors.newCachedThreadPool();
    private boolean running = true;

    public StompRelayServer(int port) {
        this.port = port;
    }

    public void start() {
        new Thread(() -> {
            try (ServerSocket serverSocket = new ServerSocket(port)) {
                logger.info("STOMP Relay Server started on port {}", port);
                while (running) {
                    Socket socket = serverSocket.accept();
                    ClientHandler handler = new ClientHandler(socket);
                    executor.execute(handler);
                }
            } catch (IOException e) {
                if (running)
                    logger.error("STOMP Relay Server error", e);
            }
        }).start();
    }

    public void stop() {
        running = false;
        executor.shutdownNow();
    }

    private class ClientHandler implements Runnable {
        private final Socket socket;
        private final Set<String> mySubscriptions = new HashSet<>();

        public ClientHandler(Socket socket) {
            this.socket = socket;
        }

        private String readHeaderLine(InputStream in) throws IOException {
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            int b;
            while ((b = in.read()) != '\n') {
                if (b == -1) return null;
                buffer.write(b);
            }
            if (buffer.size() > 0 && buffer.toByteArray()[buffer.size() - 1] == '\r') {
                byte[] bytes = buffer.toByteArray();
                return new String(bytes, 0, bytes.length - 1, java.nio.charset.StandardCharsets.UTF_8);
            }
            return new String(buffer.toByteArray(), java.nio.charset.StandardCharsets.UTF_8);
        }

        @Override
        public void run() {
            try (InputStream rawIn = socket.getInputStream();
                 OutputStream out = socket.getOutputStream();
                 BufferedInputStream in = new BufferedInputStream(rawIn)) {

                while (running) {
                    String line = readHeaderLine(in);
                    if (line == null)
                        break;
                    if (line.isEmpty())
                        continue;

                    String command = line.trim();
                    Map<String, String> headers = new HashMap<>();
                    String headerLine;
                    while ((headerLine = readHeaderLine(in)) != null && !headerLine.isEmpty()) {
                        int colon = headerLine.indexOf(':');
                        if (colon > 0) {
                            headers.put(headerLine.substring(0, colon).trim(), headerLine.substring(colon + 1).trim());
                        }
                    }

                    byte[] body;
                    if (headers.containsKey("content-length")) {
                        try {
                            int len = Integer.parseInt(headers.get("content-length"));
                            body = new byte[len];
                            int read = 0;
                            while (read < len) {
                                int c = in.read(body, read, len - read);
                                if (c == -1) break;
                                read += c;
                            }
                            // Consume the NULL byte
                            in.read();
                        } catch (NumberFormatException e) {
                            body = readUntilNull(in);
                        }
                    } else {
                        body = readUntilNull(in);
                    }

                    handleFrame(command, headers, body, out);
                }
            } catch (IOException e) {
                // Ignore disconnects
            } finally {
                cleanup();
            }
        }

        private void handleFrame(String command, Map<String, String> headers, byte[] body, OutputStream out)
                throws IOException {
            if ("CONNECT".equals(command)) {
                sendFrame(out, "CONNECTED", new HashMap<>(), null);
            } else if ("SUBSCRIBE".equals(command)) {
                String destination = headers.get("destination");
                if (destination != null) {
                    subscriptions.computeIfAbsent(destination, k -> new CopyOnWriteArrayList<>()).add(this);
                    mySubscriptions.add(destination);
                }
            } else if ("SEND".equals(command)) {
                String destination = headers.get("destination");
                if (destination != null) {
                    relayMessage(destination, body);
                }
            }
        }

        private void relayMessage(String destination, byte[] body) {
            List<ClientHandler> targets = subscriptions.get(destination);
            if (targets != null) {
                Map<String, String> headers = new HashMap<>();
                headers.put("destination", destination);
                headers.put("message-id", UUID.randomUUID().toString());
                for (ClientHandler target : targets) {
                    try {
                        target.sendFrame(target.socket.getOutputStream(), "MESSAGE", headers, body);
                    } catch (IOException e) {
                        // Target likely disconnected
                    }
                }
            }
        }

        private void sendFrame(OutputStream out, String command, Map<String, String> headers, byte[] body)
                throws IOException {
            if (body != null && body.length > 0 && !headers.containsKey("content-length")) {
                headers.put("content-length", String.valueOf(body.length));
            }

            out.write((command + "\n").getBytes(java.nio.charset.StandardCharsets.UTF_8));
            for (Map.Entry<String, String> entry : headers.entrySet()) {
                out.write((entry.getKey() + ":" + entry.getValue() + "\n").getBytes(java.nio.charset.StandardCharsets.UTF_8));
            }
            out.write('\n'); // Empty line

            if (body != null) {
                out.write(body);
            }
            out.write(0); // NULL
            out.flush();
        }

        private byte[] readUntilNull(InputStream in) throws IOException {
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            int b;
            while ((b = in.read()) != 0 && b != -1) {
                buffer.write(b);
            }
            return buffer.toByteArray();
        }

        private void cleanup() {
            for (String sub : mySubscriptions) {
                List<ClientHandler> list = subscriptions.get(sub);
                if (list != null)
                    list.remove(this);
            }
            try {
                socket.close();
            } catch (IOException e) {
                // Quiet
            }
        }
    }
}
