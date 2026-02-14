package dev.verrai.sample;

import dev.verrai.rpc.common.transport.MessageHandler;
import dev.verrai.rpc.common.transport.Transport;
import java.util.function.Consumer;

public class DebugTransport implements Transport {
    private final Transport delegate;
    private final Consumer<String> logger;

    public DebugTransport(Transport delegate, Consumer<String> logger) {
        this.delegate = delegate;
        this.logger = logger;
    }

    @Override
    public void send(byte[] data) {
        logger.accept("SEND: " + data.length + " bytes");
        delegate.send(data);
    }

    @Override
    public void addMessageHandler(MessageHandler handler) {
        delegate.addMessageHandler(message -> {
            logger.accept("RECV: " + message.length + " bytes");
            handler.onMessage(message);
        });
    }
}
