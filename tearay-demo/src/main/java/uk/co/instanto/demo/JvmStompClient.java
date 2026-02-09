package uk.co.instanto.demo;

import uk.co.instanto.tearay.rpc.common.transport.stomp.StompClient;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompSubscriptionCallback;
import uk.co.instanto.tearay.rpc.common.transport.stomp.StompMessage;

import java.io.*;
import java.net.Socket;
import java.util.*;
import java.util.concurrent.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A simple JVM-based STOMP client that connects to our StompRelayServer.
 */
public class JvmStompClient implements StompClient {
    private static final Logger logger = LoggerFactory.getLogger(JvmStompClient.class);

    private final String host;
    private final int port;
    private final String clientName;
    private Socket socket;
    private PrintWriter writer;
    private BufferedReader reader;
    private final Map<String, List<StompSubscriptionCallback>> callbacks = new ConcurrentHashMap<>();
    private boolean connected = false;

    public JvmStompClient(String host, int port, String clientName) {
        this.host = host;
        this.port = port;
        this.clientName = clientName;
    }

    public synchronized void connect() throws IOException {
        if (connected)
            return;
        this.socket = new Socket(host, port);
        this.writer = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()), true);
        this.reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        sendFrame("CONNECT", new HashMap<>(), null);

        // Block for CONNECTED response (oversimplified)
        String line = reader.readLine();
        if ("CONNECTED".equals(line)) {
            connected = true;
            startReaderThread();
        } else {
            throw new IOException("Failed to connect: " + line);
        }
    }

    private void startReaderThread() {
        Thread readerThread = new Thread(() -> {
            try {
                while (connected) {
                    String command = reader.readLine();
                    if (command == null)
                        break;
                    if (command.isEmpty())
                        continue;

                    Map<String, String> headers = new HashMap<>();
                    String headerLine;
                    while (!(headerLine = reader.readLine()).isEmpty()) {
                        int colon = headerLine.indexOf(':');
                        if (colon > 0) {
                            headers.put(headerLine.substring(0, colon).trim(), headerLine.substring(colon + 1).trim());
                        }
                    }

                    StringBuilder body = new StringBuilder();
                    int bodyChar;
                    while ((bodyChar = reader.read()) != 0 && bodyChar != -1) {
                        body.append((char) bodyChar);
                    }

                    if ("MESSAGE".equals(command)) {
                        String dest = headers.get("destination");
                        if (dest != null) {
                            List<StompSubscriptionCallback> list = callbacks.get(dest);
                            if (list != null) {
                                final String bodyStr = body.toString();
                                StompMessage msg = new StompMessage() {
                                    @Override
                                    public String getBody() {
                                        return bodyStr;
                                    }

                                    @Override
                                    public Map<String, String> getHeaders() {
                                        return headers;
                                    }
                                };
                                for (StompSubscriptionCallback cb : list) {
                                    cb.onMessage(msg);
                                }
                            }
                        }
                    }
                }
            } catch (IOException e) {
                connected = false;
            }
        });
        readerThread.setName("StompReader-" + clientName);
        readerThread.start();
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
            e.printStackTrace();
        }
    }

    @Override
    public void subscribe(String destination, StompSubscriptionCallback callback) {
        callbacks.computeIfAbsent(destination, k -> new CopyOnWriteArrayList<>()).add(callback);
        Map<String, String> headers = new HashMap<>();
        headers.put("destination", destination);
        try {
            sendFrame("SUBSCRIBE", headers, null);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private synchronized void sendFrame(String command, Map<String, String> headers, String body) throws IOException {
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
}
