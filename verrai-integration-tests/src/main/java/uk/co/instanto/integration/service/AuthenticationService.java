package uk.co.instanto.integration.service;

import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.dto.LogonResponse;
import uk.co.instanto.client.service.dto.LogonRequest;
import dev.verrai.rpc.common.annotation.Service;

@Service
public interface AuthenticationService {
    AsyncResult<LogonResponse> login(LogonRequest request);
}
