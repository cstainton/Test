package dev.verrai.sample;

import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.AsyncResultImpl;
import uk.co.instanto.client.service.dto.LogonRequest;
import uk.co.instanto.client.service.dto.LogonResponse;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class AuthenticationServiceImpl implements AuthenticationService {

    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    @Override
    public AsyncResult<LogonResponse> login(LogonRequest request) {
        AsyncResultImpl<LogonResponse> result = new AsyncResultImpl<>();

        scheduler.schedule(() -> {
            LogonResponse response = new LogonResponse();
            response.setJwtToken("dummy-jwt-token-from-worker-" + request.getUsername());
            response.setStompAddress("queue/secure-service");
            result.complete(response);
        }, 1000, TimeUnit.MILLISECONDS);

        return result;
    }
}
