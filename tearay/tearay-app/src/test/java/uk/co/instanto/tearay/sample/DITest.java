package uk.co.instanto.tearay.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class DITest {

    @Test
    public void testAppInjection() {
        // App is an @EntryPoint, so it has a factory
        App app = App_Factory.getInstance();
        assertNotNull("App instance should not be null", app);

        // Check Navigation injection
        assertNotNull("Navigation should be injected", app.navigation);

        // Check SecurityProvider injection (indirectly via Navigation or directly if we added it)
        // Check Page Injection logic
        // We can't easily check internal state of NavigationImpl from here without casting
        // But we can check that App.onModuleLoad() runs without crashing
    }

    @Test
    public void testDashboardInjection() {
        // DashboardPage is a @Page
        DashboardPage dashboard = DashboardPage_Factory.getInstance();
        assertNotNull("DashboardPage should not be null", dashboard);

        assertNotNull("HelloService should be injected", dashboard.service);
        assertNotNull("Navigation should be injected", dashboard.navigation);

        // Check Widget injection
        assertNotNull("Container widget should be injected", dashboard.container);

        // Verify Service Logic
        assertTrue(dashboard.service.getGreeting().contains("Hello"));
    }
}
