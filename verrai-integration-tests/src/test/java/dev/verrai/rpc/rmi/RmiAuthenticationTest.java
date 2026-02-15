package dev.verrai.rpc.rmi;

import dev.verrai.client.service.transport.rmi.RemoteTransport;
import dev.verrai.client.service.transport.rmi.RmiTransport;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import uk.co.instanto.client.service.AsyncResult;
import uk.co.instanto.client.service.AsyncResultImpl;
import uk.co.instanto.client.service.RpcClient;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.dto.LogonResponse;
import uk.co.instanto.client.service.dto.LogonRequest;
import uk.co.instanto.integration.service.AuthenticationService;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.*;

public class RmiAuthenticationTest {

    private static final int RMI_PORT = 10999;
    private Registry registry;
    private RmiTransport serverTransport;
    private RmiTransport clientTransport;
    private RemoteTransport serverStub;
    private RemoteTransport clientStub;

    @Before
    public void setUp() throws Exception {
        // Reset UnitRegistry
        UnitRegistry.getInstance().reset();

        // Start RMI Registry
        try {
            registry = LocateRegistry.createRegistry(RMI_PORT);
        } catch (Exception e) {
            // Already running?
            registry = LocateRegistry.getRegistry(RMI_PORT);
        }

        // Setup Server Transport
        serverTransport = new RmiTransport();
        serverStub = (RemoteTransport) UnicastRemoteObject.exportObject(serverTransport, 0);
        registry.rebind("ServerTransport", serverStub);

        // Setup Server Implementation
        UnitRegistry.getInstance().register(AuthenticationService.class, new MockAuthenticationService());

        // Init RpcServer on server side (using serverTransport)
        UnitRegistry.getInstance().initRpcServer(serverTransport);

        // Register Dispatcher
        UnitRegistry.getInstance().registerDispatcher(AuthenticationService.class.getName(), new uk.co.instanto.integration.service.AuthenticationService_Dispatcher());
    }

    @After
    public void tearDown() throws Exception {
        if (serverTransport != null) {
            try {
                UnicastRemoteObject.unexportObject(serverTransport, true);
            } catch (Exception e) {}
        }
        if (clientTransport != null) {
             try {
                UnicastRemoteObject.unexportObject(clientTransport, true);
            } catch (Exception e) {}
        }
        UnitRegistry.getInstance().reset();
    }

    @Test
    public void testAuthenticationFlow() throws Exception {
        // Setup Client Transport
        clientTransport = new RmiTransport();
        clientStub = (RemoteTransport) UnicastRemoteObject.exportObject(clientTransport, 0);

        // Lookup Server
        Registry remoteRegistry = LocateRegistry.getRegistry("localhost", RMI_PORT);
        RemoteTransport remoteServer = (RemoteTransport) remoteRegistry.lookup("ServerTransport");

        // Handshake
        remoteServer.establishConnection(clientStub);
        clientTransport.setPeer(remoteServer);

        // Register Remote Service in UnitRegistry (Client side view)
        // We use a fake node ID "server-node"
        UnitRegistry.getInstance().registerRemote(AuthenticationService.class.getName(), "server-node", clientTransport);

        // Create Client
        RpcClient rpcClient = UnitRegistry.getInstance().getClientForService(AuthenticationService.class.getName());
        assertNotNull("RpcClient should not be null", rpcClient);

        // Register Codecs
        rpcClient.registerCodec(LogonRequest.class, new uk.co.instanto.client.service.dto.LogonRequestCodec());
        rpcClient.registerCodec(LogonResponse.class, new uk.co.instanto.client.service.dto.LogonResponseCodec());

        // Invoke Login
        LogonRequest request = new LogonRequest("testUser", "password");
        CountDownLatch latch = new CountDownLatch(1);
        AtomicReference<LogonResponse> responseRef = new AtomicReference<>();
        AtomicReference<Throwable> errorRef = new AtomicReference<>();

        rpcClient.invokeStub(AuthenticationService.class.getName(), "login", new Object[]{request})
                .thenApply(bytes -> {
                    try {
                        return rpcClient.getSerializer().decode((byte[]) bytes, LogonResponse.class);
                    } catch (Exception e) { throw new RuntimeException(e); }
                })
                .thenAccept(res -> {
                    responseRef.set(res);
                    latch.countDown();
                })
                .exceptionally(err -> {
                    errorRef.set(err);
                    latch.countDown();
                    return null;
                });

        assertTrue("Timed out waiting for response", latch.await(5, TimeUnit.SECONDS));

        if (errorRef.get() != null) {
            fail("RPC call failed: " + errorRef.get().getMessage());
        }

        assertNotNull("Response should not be null", responseRef.get());
        assertEquals("dummy-token", responseRef.get().getJwtToken());
    }

    // Mock Implementation
    public static class MockAuthenticationService implements AuthenticationService {
        @Override
        public AsyncResult<LogonResponse> login(LogonRequest request) {
            AsyncResultImpl<LogonResponse> result = new AsyncResultImpl<>();
            LogonResponse response = new LogonResponse();
            response.setJwtToken("dummy-token");
            response.setStompAddress("dummy-queue");
            result.complete(response);
            return result;
        }
    }
}
