package dev.verrai.sample;

import uk.co.instanto.client.service.WorkerBootstrap;
import uk.co.instanto.client.service.UnitRegistry;
import dev.verrai.rpc.teavm.WebWorkerTransport;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;

public class WorkerEntry {

    public static void main(String[] args) {
        JSObject self = self();
        WebWorkerTransport transport = new WebWorkerTransport(self);
        WorkerBootstrap bootstrap = new WorkerBootstrap(transport);

        // Register Dispatcher
        try {
            // Use reflection to avoid compile-time dependency on generated class in the same module
            Class<?> dispatcherClass = Class.forName("dev.verrai.sample.AuthenticationService_Dispatcher");
            Object dispatcher = dispatcherClass.newInstance();
            bootstrap.registerDispatcher(AuthenticationService.class.getName(), (uk.co.instanto.client.service.transport.ServiceDispatcher) dispatcher);
        } catch (Exception e) {
            System.out.println("Failed to register dispatcher: " + e.getMessage());
            e.printStackTrace();
        }

        // Register Implementation
        UnitRegistry.register(AuthenticationService.class, new AuthenticationServiceImpl());

        System.out.println("Worker started and listening...");
    }

    @JSBody(script = "return self;")
    private static native JSObject self();
}
