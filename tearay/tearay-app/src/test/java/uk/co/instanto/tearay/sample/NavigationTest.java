package uk.co.instanto.tearay.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import uk.co.instanto.tearay.impl.NavigationImpl;
import uk.co.instanto.tearay.impl.NavigationImpl_Factory;
import java.util.HashMap;
import java.util.Map;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM // Skip JVM execution as these tests rely on JSO (Window, Document) available only in JS environment
public class NavigationTest {

    @Test
    public void testNavigationWithState() {
        NavigationImpl nav = NavigationImpl_Factory.getInstance();

        // Mocking SecurityProvider if needed, but NavigationImpl handles null/default checks usually
        // Actually we injected AppSecurityProvider in the app, so it should be there?
        // NavigationImpl_Factory uses getInstance(), which is singleton.
        // But AppSecurityProvider is also singleton.

        Map<String, String> state = new HashMap<>();
        state.put("username", "TestUser");

        // We can't easily inspect the 'currentPage' field of NavigationImpl as it's private and typed as Object
        // But we can try to navigate and see if it throws exceptions.

        try {
            nav.goTo("dashboard", state);
        } catch (Exception e) {
            fail("Navigation failed: " + e.getMessage());
        }

        // Ideally we would assert that DashboardPage.username == "TestUser"
        // But we don't have reference to the active page instance here easily without modifying NavigationImpl
        // for testing visibility.
    }
}
