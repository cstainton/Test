package uk.co.instanto.integration;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.co.instanto.client.service.DiscoveryService;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.transport.LocalTransport;
import uk.co.instanto.client.service.EventBus;
import static org.junit.Assert.assertTrue;

public class DiscoveryTest {
        private static final Logger logger = LoggerFactory.getLogger(DiscoveryTest.class);

        @Test
        public void testCrossNodeDiscovery() throws Exception {
                // Topology:
                // JVM <--(transport1)--> Browser <--(transport2)--> Worker

                // 1. Setup JVM Node
                uk.co.instanto.client.service.GlobalUnitBootstrap.SimulatedUnit jvmUnit = uk.co.instanto.client.service.GlobalUnitBootstrap
                                .createSimulatedUnit("jvm");
                UnitRegistry jvmRegistry = jvmUnit.registry;
                logger.info("JVM Registry@{}", Integer.toHexString(jvmRegistry.hashCode()));
                jvmRegistry.registerLocal("uk.co.instanto.JvmService", "jvm-impl");

                // 2. Setup Browser Node
                uk.co.instanto.client.service.GlobalUnitBootstrap.SimulatedUnit browserUnit = uk.co.instanto.client.service.GlobalUnitBootstrap
                                .createSimulatedUnit("browser");
                UnitRegistry browserRegistry = browserUnit.registry;
                logger.info("Browser Registry@{}", Integer.toHexString(browserRegistry.hashCode()));
                LocalTransport browserToJvm = new LocalTransport();
                LocalTransport browserToWorker = new LocalTransport();
                browserUnit.eventBus.addTransport(browserToJvm);
                browserUnit.eventBus.addTransport(browserToWorker);
                browserRegistry.registerLocal("uk.co.instanto.BrowserService", "browser-impl");

                // 3. Setup Worker Node
                uk.co.instanto.client.service.GlobalUnitBootstrap.SimulatedUnit workerUnit = uk.co.instanto.client.service.GlobalUnitBootstrap
                                .createSimulatedUnit("worker");
                UnitRegistry workerRegistry = workerUnit.registry;
                logger.info("Worker Registry@{}", Integer.toHexString(workerRegistry.hashCode()));
                LocalTransport workerToBrowser = new LocalTransport();
                workerUnit.eventBus.addTransport(workerToBrowser);
                workerRegistry.registerLocal("uk.co.instanto.WorkerService", "worker-impl");

                // Connect them all
                // Connect them all
                jvmUnit.localTransport.connect(browserToJvm);
                browserToJvm.connect(jvmUnit.localTransport);

                browserToWorker.connect(workerToBrowser);
                workerToBrowser.connect(browserToWorker);

                // jvmUnit.localTransport is the one created by bootstrap.
                // jvmUnit.localTransport.connect(browserToJvm); // Already done above
                // browserToJvm.connect(jvmUnit.localTransport); // Already done above

                // Worker uses workerUnit.localTransport.
                // Note: workerToBrowser was just a plain transport I created.
                // But workerUnit has its OWN localTransport created by bootstrap.
                // If I want the worker UNIT to speak, I must connect ITS transport.
                // Wait. 'workerToBrowser' is added to workerUnit.eventBus above:
                // workerUnit.eventBus.addTransport(workerToBrowser);
                // So workerUnit outputs to workerToBrowser.
                // And receives from workerToBrowser? Yes if connected.

                // So the connection 'workerToBrowser.connect(browserToWorker)' is correct.
                // And 'browserToWorker.connect(workerToBrowser)' is correct.

                // What about workerUnit.localTransport?
                // It is currently unused in this topology if we explicitly added specific
                // transports.
                // That's fine. Tests often do manual wiring.

                // Init all units so listeners are active
                // Order matters for "Step 0" initial knowledge, but for the steps below we will
                // explicitly announce.
                jvmUnit.startDiscovery();
                browserUnit.startDiscovery();
                workerUnit.startDiscovery();

                // Allow some time for initial events to settle?
                // Thread.sleep(50);

                // --- Step 1: Worker announces to Browser ---
                // Worker already announced in init. But let's announce again to be sure browser
                // catches it if it wasn't ready (it should be).
                workerUnit.registry.announce();
                assertTrue("Browser should know WorkerService",
                                browserRegistry.getDiscoverableServiceIdsInstance()
                                                .contains("uk.co.instanto.WorkerService"));

                // --- Step 2: Browser announces to JVM (should include relaying WorkerService)
                // ---
                browserUnit.registry.announce();
                assertTrue("JVM should know BrowserService",
                                jvmRegistry.getDiscoverableServiceIdsInstance()
                                                .contains("uk.co.instanto.BrowserService"));
                assertTrue("JVM should know WorkerService (relayed via browser)",
                                jvmRegistry.getDiscoverableServiceIdsInstance()
                                                .contains("uk.co.instanto.WorkerService"));

                // --- Step 3: JVM announces to Browser ---
                jvmUnit.registry.announce();
                assertTrue("Browser should know JvmService",
                                browserRegistry.getDiscoverableServiceIdsInstance()
                                                .contains("uk.co.instanto.JvmService"));

                // --- Step 4: Browser announces back to Worker (should include relaying
                // JvmService) ---
                browserUnit.registry.announce(); // Re-announce to update peers
                assertTrue("Worker should know JvmService (relayed via browser)",
                                workerRegistry.getDiscoverableServiceIdsInstance()
                                                .contains("uk.co.instanto.JvmService"));

                // --- Step 5: Verify cleanup ---
                jvmRegistry.cleanupStaleServices(5000); // 5s timeout, all nodes still fresh
                assertTrue("JVM should still know WorkerService",
                                jvmRegistry.getDiscoverableServiceIdsInstance()
                                                .contains("uk.co.instanto.WorkerService"));

                // Simulate node failure by waiting and not heartbeating
                logger.info("Simulating stale timeout...");
                Thread.sleep(100);
                jvmRegistry.cleanupStaleServices(50); // Small timeout to force cleanup
                assertTrue("JVM should have cleaned up BrowserService",
                                !jvmRegistry.getDiscoverableServiceIdsInstance()
                                                .contains("uk.co.instanto.BrowserService"));
                assertTrue("JVM should have cleaned up WorkerService",
                                !jvmRegistry.getDiscoverableServiceIdsInstance()
                                                .contains("uk.co.instanto.WorkerService"));
                assertTrue("JVM should still have its OWN service",
                                jvmRegistry.getDiscoverableServiceIdsInstance().contains("uk.co.instanto.JvmService"));

                logger.info("Cross-node discovery and liveness test passed!");
        }

        private EventBus createEventBus(String nodeId) {
                EventBus bus = new EventBus(nodeId);
                registerIdentityCodec(bus, uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent.class,
                                uk.co.instanto.client.service.dto.proto.NodeAnnouncedEvent.ADAPTER);
                registerIdentityCodec(bus, uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent.class,
                                uk.co.instanto.client.service.dto.proto.NodeHeartbeatEvent.ADAPTER);
                registerIdentityCodec(bus, uk.co.instanto.client.service.dto.proto.NodeDepartedEvent.class,
                                uk.co.instanto.client.service.dto.proto.NodeDepartedEvent.ADAPTER);
                return bus;
        }

        private <T extends com.squareup.wire.Message<T, ?>> void registerIdentityCodec(EventBus bus, Class<T> cls,
                        com.squareup.wire.ProtoAdapter<T> adapter) {
                bus.registerCodec(cls, new uk.co.instanto.tearay.rpc.common.codec.Codec<T, T>() {
                        @Override
                        public T toWire(T domain) {
                                return domain;
                        }

                        @Override
                        public T fromWire(T wire) {
                                return wire;
                        }

                        @Override
                        public com.squareup.wire.ProtoAdapter<T> getWireAdapter() {
                                return adapter;
                        }
                });
        }
}
