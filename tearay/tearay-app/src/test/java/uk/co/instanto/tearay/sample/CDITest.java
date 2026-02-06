package uk.co.instanto.tearay.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM // The factory might not be available in standard JVM classpath if processor didn't run there, but let's try.
         // Actually, if we use TeaVMTestRunner, we are in JS environment.
public class CDITest {

    @Test
    public void testEvents() {
        CDITestBean bean = CDITestBean_Factory.getInstance();
        assertNotNull("Bean should be instantiated", bean);
        assertNotNull("Event should be injected", bean.stringEvent);

        bean.stringEvent.fire("Hello CDI");

        assertEquals("Hello CDI", bean.observedValue);
    }
}
