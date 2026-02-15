package dev.verrai.sample;

import uk.co.instanto.client.service.TearayApplication;
import uk.co.instanto.client.service.TearayRunner;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.dto.LogonRequest;
import uk.co.instanto.client.service.transport.LocalTransport;
import uk.co.instanto.client.service.Inject;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class JreApp implements TearayApplication {

    // 1. Define Service Provider (Server Side)
    // TearayRunner will detect this field (because it implements an @Service interface)
    // and register it as a local service provider with UnitRegistry.
    private final AuthenticationServiceImpl authProvider = new AuthenticationServiceImpl();

    // 2. Define Service Consumer (Client Side)
    // TearayRunner will detect @Inject, wait for the service to be available (via UnitRegistry),
    // and inject the proxy stub.
    @Inject
    private AuthenticationService authClient;

    private static final CountDownLatch latch = new CountDownLatch(1);

    @Override
    public void onStart() {
        System.out.println("JreApp started! Dependencies injected.");

        if (authClient == null) {
            System.err.println("Error: authClient is null!");
            return;
        }

        System.out.println("Calling login() via injected proxy...");
        LogonRequest req = new LogonRequest("JreUser", "AutoWired");

        authClient.login(req).thenAccept(response -> {
            System.out.println("Login Successful! Token: " + response.getJwtToken());
            latch.countDown();
        }).exceptionally(err -> {
            System.err.println("Login Failed: " + err.getMessage());
            err.printStackTrace();
            latch.countDown();
            return null;
        });
    }

    public static void main(String[] args) throws Exception {
        System.out.println("Bootstrapping JreApp with TearayRunner...");

        TearayRunner.run(JreApp.class, registry -> {
            // Setup Transport
            LocalTransport clientTransport = new LocalTransport();
            LocalTransport serverTransport = new LocalTransport();
            clientTransport.connect(serverTransport);
            serverTransport.connect(clientTransport);

            // Register Factory (Required for client stub creation)
            registry.registerFactory(AuthenticationService.class, new AuthenticationService_Factory());

            // Configure Routing
            // Map remote service ID to "local" node, which uses clientTransport
            registry.registerRemote(AuthenticationService.class.getName(), "local-node", clientTransport);

            // Configure Server Side (to receive calls from clientTransport -> serverTransport)
            registry.initRpcServer(serverTransport);
        });

        // Keep main thread alive
        if (latch.await(5, TimeUnit.SECONDS)) {
            System.out.println("Test Passed.");
            System.exit(0);
        } else {
            System.err.println("Test Timed Out.");
            System.exit(1);
        }
    }
}
