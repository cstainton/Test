package uk.co.instanto.integration.service;

import uk.co.instanto.integration.service.dto.*;

import uk.co.instanto.tearay.rpc.common.annotation.Service;

import uk.co.instanto.client.service.AsyncResult;

@Service
public interface MyDataService {
    AsyncResult<Void> processData(MyData data);

    AsyncResult<Employee> getBoss(Organization org);
}
