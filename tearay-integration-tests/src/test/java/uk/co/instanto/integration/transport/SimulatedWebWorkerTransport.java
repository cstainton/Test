package uk.co.instanto.integration.transport;

import uk.co.instanto.tearay.rpc.common.transport.MessageHandler;
import uk.co.instanto.tearay.rpc.common.transport.Transport;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

/**
 * A Transport implementation that simulates a WebWorker environment.
 * It uses BlockingQueues to simulate the 'postMessage' channel between
 * the Worker (Code under test) and the Main Thread (Test Harness/Bridge).
 */
public class SimulatedWebWorkerTransport implements Transport {

    private final BlockingQueue<byte[]> outgoing; // Worker -> Main
    private final BlockingQueue<byte[]> incoming; // Main -> Worker
    private final List<MessageHandler> handlers = new ArrayList<>();
    private final Thread workerListenerThread;
    private volatile boolean running = true;

    // "Main Thread" side accessors
    public SimulatedWebWorkerTransport() {
        this.outgoing = new LinkedBlockingQueue<>();
        this.incoming = new LinkedBlockingQueue<>();

        // Start a thread to act as the "onmessage" event loop inside the worker
        this.workerListenerThread = new Thread(() -> {
            while (running) {
                try {
                    byte[] msg = incoming.poll(100, TimeUnit.MILLISECONDS);
                    if (msg != null) {
                        synchronized (handlers) {
                            for (MessageHandler h : handlers) {
                                h.onMessage(msg);
                            }
                        }
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }, "SimulatedWorker-EventLoop");
        this.workerListenerThread.start();
    }

    public void stop() {
        running = false;
        try {
            workerListenerThread.join(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // --- Transport Implementation (Called by Worker Code) ---

    @Override
    public void send(byte[] data) {
        // "postMessage" to Main
        outgoing.offer(data);
    }

    @Override
    public void addMessageHandler(MessageHandler handler) {
        synchronized (handlers) {
            handlers.add(handler);
        }
    }

    // --- Main Thread Bridge Methods (Called by Test Harness) ---

    public byte[] pollOutgoing(long timeout, TimeUnit unit) throws InterruptedException {
        return outgoing.poll(timeout, unit);
    }

    public void injectIncoming(byte[] data) {
        // Main thread "postMessage" to Worker
        incoming.offer(data);
    }
}
