package uk.co.instanto.tearay.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class DependentScopeTest {

    @Test
    public void testDependentScope() {
        DependentBean bean1 = DependentBean_Factory.getInstance();
        DependentBean bean2 = DependentBean_Factory.getInstance();

        assertNotNull(bean1);
        assertNotNull(bean2);
        assertNotSame("Dependent beans should be different instances", bean1, bean2);

        bean1.counter = 5;
        assertEquals(5, bean1.counter);
        assertEquals(0, bean2.counter);
    }

    @Test
    public void testSingletonScope() {
        SingletonBean bean1 = SingletonBean_Factory.getInstance();
        SingletonBean bean2 = SingletonBean_Factory.getInstance();

        assertNotNull(bean1);
        assertNotNull(bean2);
        assertSame("Singleton beans should be the same instance", bean1, bean2);

        bean1.counter = 10;
        assertEquals(10, bean2.counter);
    }
}
