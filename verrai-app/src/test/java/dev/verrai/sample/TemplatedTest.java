package dev.verrai.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import org.teavm.jso.dom.html.HTMLElement;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM // Skip JVM execution as these tests rely on JSO (Window, Document) available only in JS environment
public class TemplatedTest {

    @Test
    public void testTemplatingBinding() {
        DashboardPage page = DashboardPage_Factory.getInstance();

        // Invoke binder (normally done by factory if @Templated is processed correctly,
        // but let's verify the Binder class exists and works)
        HTMLElement root = DashboardPage_Binder.bind(page);

        assertNotNull("Root element should be created", root);
        assertEquals("Root element should be assigned to page", root, page.element);

        // Verify Content
        assertTrue(root.getInnerHTML().contains("Dashboard"));

        // Verify Widget Replacement
        // The container should be attached
        assertNotNull(page.container);
        assertNotNull(page.container.element);
        assertNotNull(page.container.element.getParentNode());

        // Check attribute merging (if we had a specific test case for it)
        // DashboardPage.html has <div data-field="container"></div>
        // Container widget has class="container"
        // After merge, it should be just "container" (plus any from placeholder if it had one)
        assertEquals("container", page.container.element.getClassName());
    }
}
