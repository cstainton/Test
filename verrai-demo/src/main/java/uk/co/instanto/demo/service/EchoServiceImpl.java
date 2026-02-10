package uk.co.instanto.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.demo.service.dto.*;
import java.util.HashMap;
import java.util.Map;

public class EchoServiceImpl implements EchoService {
    private static final Logger logger = LoggerFactory.getLogger(EchoServiceImpl.class);
    private final String nodeId;

    public EchoServiceImpl(String nodeId) {
        this.nodeId = nodeId;
    }

    @Override
    public uk.co.instanto.client.service.AsyncResult<Greeting> echo(Greeting greeting) {
        logger.info("Node {} echoing greeting from {}", nodeId, greeting.getSenderNodeId());

        Greeting response = new Greeting(greeting.getMessage(), nodeId);
        Map<String, String> translations = new HashMap<>();

        // Add fun translations
        translations.put("en", "Hello from " + nodeId);
        translations.put("fr", "Bonjour de " + nodeId);
        translations.put("es", "Hola desde " + nodeId);
        translations.put("de", "Hallo von " + nodeId);
        translations.put("jp", "こんにちは " + nodeId + " より");

        response.setTranslations(translations);
        response.setCountry(new Country("United Kingdom", "GB"));

        uk.co.instanto.client.service.AsyncResultImpl<Greeting> result = new uk.co.instanto.client.service.AsyncResultImpl<>();
        result.complete(response);
        return result;
    }

    @Override
    public uk.co.instanto.client.service.AsyncStreamResult<Greeting> streamGreetings(Greeting request) {
        uk.co.instanto.client.service.AsyncStreamResultImpl<Greeting> result = new uk.co.instanto.client.service.AsyncStreamResultImpl<>();

        // Simulate async stream
        new Thread(() -> {
            try {
                for (int i = 0; i < 3; i++) {
                    Thread.sleep(200);
                    Greeting msg = new Greeting("Stream Item " + i + ": " + request.getMessage(), nodeId);
                    result.onNext(msg);
                }
                result.onComplete();
            } catch (Exception e) {
                result.onError(e);
            }
        }).start();

        return result;
    }
}
