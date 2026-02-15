package uk.co.instanto.integration;

import org.junit.Test;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.transport.LocalTransport;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;
import java.util.Set;
import java.util.HashSet;

public class UnitRegistryBenchmarkTest {

    @Test
    public void benchmarkCleanupStaleServices() {
        UnitRegistry registry = new UnitRegistry();

        // Setup
        int nodeCount = 1000;
        int servicesPerNode = 10;

        System.out.println("Setting up " + nodeCount + " nodes with " + servicesPerNode + " services each...");

        for (int i = 0; i < nodeCount; i++) {
            String nodeId = "node-" + i;
            // Each node needs a transport. Using LocalTransport as a simple impl.
            LocalTransport transport = new LocalTransport();

            // Register services for this node
            for (int j = 0; j < servicesPerNode; j++) {
                String serviceId = "service-" + i + "-" + j;
                registry.registerRemote(serviceId, nodeId, transport);
            }
        }

        System.out.println("Total discoverable services: " + registry.getDiscoverableServiceIdsInstance().size());

        // Measure
        long start = System.nanoTime();
        // Use a timeout of -1 to force cleanup of everything (as everything was just registered with current time)
        // System.currentTimeMillis() - heartbeats (also current) will be ~0. 0 > -1 is true.
        registry.cleanupStaleServices(-1);
        long end = System.nanoTime();

        long durationMs = TimeUnit.NANOSECONDS.toMillis(end - start);
        System.out.println("Cleanup took: " + durationMs + " ms");

        // Verification
        if (!registry.getDiscoverableServiceIdsInstance().isEmpty()) {
             throw new RuntimeException("Registry should be empty but has " + registry.getDiscoverableServiceIdsInstance().size() + " services");
        }
    }
}
