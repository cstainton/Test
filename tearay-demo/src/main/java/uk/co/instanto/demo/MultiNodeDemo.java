package uk.co.instanto.demo;

import uk.co.instanto.client.service.DiscoveryService;
import uk.co.instanto.client.service.Inject;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.RpcServer;
import uk.co.instanto.client.service.TearayApplication;
import uk.co.instanto.client.service.TearayRunner;
import uk.co.instanto.client.service.transport.StompTransport;
import uk.co.instanto.demo.service.EchoService;
import uk.co.instanto.demo.service.EchoServiceImpl;
import uk.co.instanto.demo.service.dto.Greeting;
import uk.co.instanto.demo.service.EchoService_Dispatcher;
import uk.co.instanto.demo.service.EchoService_Factory;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * MultiNodeDemo simulates a multi-node environment using a single JVM.
 * Node A provides the EchoService, and Node B consumes it.
 */
public class MultiNodeDemo {
    private static final Logger logger = LoggerFactory.getLogger(MultiNodeDemo.class);

    public static void main(String[] args) throws Exception {
        int brokerPort = 61613;

        // 1. Start the STOMP Relay Server
        StompRelayServer broker = new StompRelayServer(brokerPort);
        broker.start();

        boolean debug = Boolean.getBoolean("json.debug") || (args.length > 0 && args[0].equalsIgnoreCase("json"));
        if (debug) {
            System.out.println("JSON DEBUG MODE ENABLED (Reflection-Free)");
        }

        // 2. Start Node A (Provider) - Using TearayRunner
        new Thread(() -> {
            TearayRunner.run(NodeAApp.class, registry -> {
                try {
                    JvmStompClient clientA = new JvmStompClient("localhost", brokerPort, "NodeA");
                    clientA.connect();
                    registry.configureStomp("NodeA", clientA);

                    if (debug) {
                        System.out.println("[NodeA] Setting ReflectionFreeJsonSerializer");
                        registry.setSerializer(
                                new uk.co.instanto.tearay.rpc.common.serialization.ReflectionFreeJsonSerializer());
                    }

                    // NOTE: We don't register Dispatcher manually anymore!
                    // The runner sees 'echoImpl' field and does it automatically.
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }).start();

        logger.info("Node A (Provider) starting...");

        // Give Node A a moment to start
        Thread.sleep(1000);

        // 3. Start Node B (Consumer) - Using TearayRunner
        TearayRunner.run(DemoApp.class, registry -> {
            try {
                JvmStompClient clientB = new JvmStompClient("localhost", brokerPort, "NodeB");
                clientB.connect();
                registry.configureStomp("NodeB", clientB);

                if (debug) {
                    System.out.println("[NodeB] Setting ReflectionFreeJsonSerializer");
                    registry.setSerializer(
                            new uk.co.instanto.tearay.rpc.common.serialization.ReflectionFreeJsonSerializer());
                }

                // DEMO: Subscribe to NodeAnnouncedEvent
                registry.getEventBus().subscribe(uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent.class,
                        event -> {
                            System.out.println("\n[NodeB] RECEIVED EVENT: Node " + event.nodeId
                                    + " announced services: " + event.serviceIds);
                        });

                // Manual Factory Registration (required for TeaVM compatibility)
                registry.registerFactory(EchoService.class, new EchoService_Factory());

            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Keep main alive
        try {
            Thread.currentThread().join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // Node A Application (Provider)
    public static class NodeAApp implements TearayApplication {
        // This field will be auto-detected and registered!
        // It implements EchoService, which has @Service.
        EchoService echoImpl = new EchoServiceImpl("NodeA-JVM");

        @Override
        public void onStart() {
            System.out.println("NodeAApp Started! Service 'echoImpl' should be registered.");
        }
    }

    // Node B Application (Consumer)
    public static class DemoApp implements TearayApplication {

        @Inject
        EchoService echoService;

        @Override
        public void onStart() {
            System.out.println("DemoApp Started! Services Injected.");

            try {
                // Wait briefly for discovery if needed, but Inject usually waits or we use
                // awaitService
                // But here we just assume it's ready or will be resolved by the proxy?
                // Actually, the proxy might throw if no transport is found yet.
                // Let's rely on standard discovery delay or retry logic in client.
                Thread.sleep(1000);

                logger.info("Node B calling echo via injected service...");

                Greeting request = new Greeting("Hello World", "NodeB-JVM");
                // Skipping complex map for JSON Debug Mode MVP
                // request.getTranslations().put("fr", "Bonjour le monde");

                echoService.echo(request).thenAccept(response -> {
                    logger.info("\n--- RPC SUCCESS ---");
                    logger.info("Response Sender: {}", response.getSenderNodeId());
                    logger.info("Response Text: {}", response.getMessage());
                    // logger.info("Translations: {}", response.getTranslations());

                    logger.info("Starting Stream Test...");
                    echoService.streamGreetings(request).subscribe(
                            item -> logger.info("STREAM ITEM: {}", item.getMessage()),
                            err -> {
                                logger.error("STREAM ERROR", err);
                                System.exit(1);
                            },
                            () -> {
                                logger.info("STREAM COMPLETE");
                                logger.info("Demo finished successfully.");
                                System.exit(0);
                            });
                }).exceptionally(ex -> {
                    logger.error("RPC Failed", ex);
                    return null;
                });

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
