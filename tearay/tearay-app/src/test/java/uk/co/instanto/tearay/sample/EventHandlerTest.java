package uk.co.instanto.tearay.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.MouseEvent;
import org.teavm.jso.JSBody;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM // Depends on TeaVM JSO/DOM
public class EventHandlerTest {

    @Test
    public void testEventHandlers() {
        // Since we don't have a generated factory for arbitrary classes unless they are EntryPoints or Pages,
        // and this one IS a @Page, we can use the factory.
        // Note: The factory class name depends on the processor. Assuming EventHandlerTestPage_Factory.

        EventHandlerTestPage page = EventHandlerTestPage_Factory.getInstance();
        assertNotNull("Page instance should be created", page);

        // Bind should happen inside factory creation (getInstance -> createInstance -> Binder.bind) if implemented that way.
        // Wait, IOCProcessor usually handles instantiation and members injection.
        // But TemplatedProcessor generates the _Binder class.
        // Who calls the Binder?
        // In this architecture (from inspection of App_Factory etc), the factory usually does manual instantiation.
        // Let's check DashboardPage_Factory to see if it calls binder.
        // If not, we might need to call binder manually in the test.

        // Actually, let's call bind manually to be sure, as the previous TemplatedTest did.
        HTMLElement root = EventHandlerTestPage_Binder.bind(page);
        assertNotNull("Root element should be bound", root);

        // Now simulate clicks.

        // 1. Widget Click
        assertNotNull("Widget should be injected", page.btnWidget);
        assertNotNull("Widget element should be present", page.btnWidget.element);
        click(page.btnWidget.element);
        assertTrue("Widget handler should be called", page.widgetClicked);

        // 2. Element Click
        assertNotNull("Element field should be injected/bound", page.btnElement);
        click(page.btnElement);
        assertTrue("Element handler should be called", page.elementClicked);

        // 3. Unmapped Element Click
        // We need to find it via root querySelector since we don't have a field
        HTMLElement unmapped = root.querySelector("[data-field='btnUnmapped']");
        assertNotNull("Unmapped element should exist in DOM", unmapped);
        click(unmapped);
        assertTrue("Unmapped handler should be called", page.unmappedClicked);
    }

    private void click(HTMLElement element) {
        MouseEvent event = createMouseEvent("click");
        element.dispatchEvent(event);
    }

    @JSBody(params = { "type" }, script = "var evt = document.createEvent('MouseEvent'); evt.initEvent(type, true, true); return evt;")
    private static native MouseEvent createMouseEvent(String type);
}
