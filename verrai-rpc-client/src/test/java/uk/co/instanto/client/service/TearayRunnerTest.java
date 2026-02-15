package uk.co.instanto.client.service;

import uk.co.instanto.client.service.dummy.TestService;
import uk.co.instanto.client.service.dummy.TestServiceImpl;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class TearayRunnerTest {

    @Before
    public void setup() {
        UnitRegistry.getInstance().reset();
    }

    @After
    public void tearDown() {
        UnitRegistry.getInstance().reset();
    }

    @Test
    public void testServiceRegistration() {
        // Run the runner
        TearayRunner.run(MyApp.class, (registry) -> {});

        // Assert that the service was registered
        // The service name is the fully qualified name of the interface
        String serviceName = TestService.class.getName();
        Object registeredService = UnitRegistry.getInstance().getLocalServiceInstance(serviceName);

        assertNotNull("Service should be registered", registeredService);
        assertTrue("Service should be instance of TestServiceImpl", registeredService instanceof TestServiceImpl);
    }

    // Dummy Application using the dummy service
    public static class MyApp implements TearayApplication {
        // This field should be detected by TearayRunner
        public TestService service = new TestServiceImpl();

        @Override
        public void onStart() {}
    }
}
