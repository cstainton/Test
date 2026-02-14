package dev.verrai.sample;

import dev.verrai.rpc.common.annotation.Service;
import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.dto.LogonRequest;
import uk.co.instanto.client.service.dto.LogonResponse;

@Service
public interface AuthenticationService {
    AsyncResult<LogonResponse> login(LogonRequest request);
}
