package dev.verrai.sample;

import dev.verrai.rpc.common.annotation.Service;
import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.AsyncResultImpl;
import uk.co.instanto.client.service.dto.LogonRequest;
import uk.co.instanto.client.service.dto.LogonResponse;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSFunctor;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Override
    public AsyncResult<LogonResponse> login(LogonRequest request) {
        AsyncResultImpl<LogonResponse> result = new AsyncResultImpl<>();

        setTimeout(() -> {
            LogonResponse response = new LogonResponse();
            response.setJwtToken("dummy-jwt-token-from-worker-" + request.getUsername());
            response.setStompAddress("queue/secure-service");
            result.complete(response);
        }, 1000); // 1 second delay

        return result;
    }

    @JSBody(params = { "handler", "timeout" }, script = "setTimeout(handler, timeout);")
    private static native int setTimeout(TimerHandler handler, int timeout);

    @JSFunctor
    public interface TimerHandler extends JSObject {
        void onTimer();
    }
}
