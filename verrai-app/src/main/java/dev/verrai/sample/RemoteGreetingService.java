package dev.verrai.sample;

import dev.verrai.rpc.common.annotation.Service;
import uk.co.instanto.client.service.AsyncResult;

@Service
public interface RemoteGreetingService {
    AsyncResult<String> getGreeting(String name);
}
