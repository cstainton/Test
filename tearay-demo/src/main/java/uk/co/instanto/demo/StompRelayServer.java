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

        @Override
        public void run() {
            try (InputStream in = socket.getInputStream();
                    OutputStream out = socket.getOutputStream();
                    BufferedReader reader = new BufferedReader(new InputStreamReader(in))) {

                while (running) {
                    String line = reader.readLine();
                    if (line == null)
                        break;
                    if (line.isEmpty())
                        continue;

                    String command = line.trim();
                    Map<String, String> headers = new HashMap<>();
                    String headerLine;
                    while (!(headerLine = reader.readLine()).isEmpty()) {
                        int colon = headerLine.indexOf(':');
                        if (colon > 0) {
                            headers.put(headerLine.substring(0, colon).trim(), headerLine.substring(colon + 1).trim());
                        }
                    }

                    // For this simple broker, we assume body is everything until NULL (0) or fixed
                    // length if specified
                    StringBuilder body = new StringBuilder();
                    int bodyChar;
                    while ((bodyChar = reader.read()) != 0 && bodyChar != -1) {
                        body.append((char) bodyChar);
                    }

                    handleFrame(command, headers, body.toString(), out);
                }
            } catch (IOException e) {
                // Ignore disconnects
            } finally {
                cleanup();
            }
        }

        private void handleFrame(String command, Map<String, String> headers, String body, OutputStream out)
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

        private void relayMessage(String destination, String body) {
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

        private void sendFrame(OutputStream out, String command, Map<String, String> headers, String body)
                throws IOException {
            PrintWriter writer = new PrintWriter(new OutputStreamWriter(out), true);
            writer.println(command);
            for (Map.Entry<String, String> entry : headers.entrySet()) {
                writer.println(entry.getKey() + ":" + entry.getValue());
            }
            writer.println();
            if (body != null) {
                writer.print(body);
            }
            writer.print('\0');
            writer.flush();
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
