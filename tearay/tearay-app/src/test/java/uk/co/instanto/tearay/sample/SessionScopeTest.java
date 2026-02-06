package uk.co.instanto.tearay.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import uk.co.instanto.tearay.api.impl.SessionContext;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class SessionScopeTest {

    @Test
    public void testSessionScope() {
        SessionBean bean1 = SessionBean_Factory.getInstance();
        assertNotNull(bean1);
        bean1.data = "session-data";

        SessionBean bean2 = SessionBean_Factory.getInstance();
        assertSame("Session beans should be cached", bean1, bean2);
        assertEquals("session-data", bean2.data);

        // Simulate Logout
        SessionContext.getInstance().clear();

        SessionBean bean3 = SessionBean_Factory.getInstance();
        assertNotNull(bean3);
        assertNotSame("After clear, should get new instance", bean1, bean3);
        assertNull("New instance should have default state", bean3.data);
    }
}
