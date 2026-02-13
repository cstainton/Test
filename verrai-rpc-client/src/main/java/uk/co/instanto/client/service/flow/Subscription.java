package uk.co.instanto.client.service.flow;

public interface Subscription {
    void request(long n);
    void cancel();
}
