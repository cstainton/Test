package uk.co.instanto.demo.service;

import uk.co.instanto.demo.service.dto.*;
import uk.co.instanto.tearay.rpc.common.annotation.Service;

import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.AsyncStreamResult;

@Service
public interface EchoService {
    AsyncResult<Greeting> echo(Greeting greeting);

    AsyncStreamResult<Greeting> streamGreetings(Greeting request);
}
