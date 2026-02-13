package uk.co.instanto.client.service;

import org.junit.Test;
import java.util.concurrent.atomic.AtomicInteger;
import static org.junit.Assert.assertEquals;

public class AsyncStreamResultImplTest {

    @Test
    public void testConcurrentModification() {
        AsyncStreamResultImpl<String> result = new AsyncStreamResultImpl<>();
        AtomicInteger count = new AtomicInteger(0);

        AsyncStreamResult.Subscription sub1 = result.subscribe(item -> {
            count.incrementAndGet();
            // This will cause ConcurrentModificationException in the current implementation
            result.subscribe(i -> {}, e -> {}, () -> {});
        }, e -> {}, () -> {});

        result.onNext("hello");
        assertEquals(1, count.get());
    }

    @Test
    public void testUnsubscribeDuringCallback() {
        AsyncStreamResultImpl<String> result = new AsyncStreamResultImpl<>();
        AtomicInteger count = new AtomicInteger(0);

        final AsyncStreamResult.Subscription[] subHolder = new AsyncStreamResult.Subscription[1];
        subHolder[0] = result.subscribe(item -> {
            count.incrementAndGet();
            subHolder[0].cancel();
        }, e -> {}, () -> {});

        result.onNext("hello");
        assertEquals(1, count.get());

        result.onNext("world");
        assertEquals(1, count.get());
    }
}
