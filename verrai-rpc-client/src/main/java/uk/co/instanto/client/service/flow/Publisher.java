package uk.co.instanto.client.service.flow;

public interface Publisher<T> {
    void subscribe(Subscriber<? super T> subscriber);
}
