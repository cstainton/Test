package uk.co.instanto.tearay.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.teavm.jso.JSBody;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.events.Event;
import org.teavm.junit.SkipJVM;
import org.teavm.junit.TeaVMTestRunner;
import uk.co.instanto.tearay.bootstrap.Slider;
import static org.junit.Assert.*;

@RunWith(TeaVMTestRunner.class)
@SkipJVM
public class SliderPerformanceTest {

    private int callCount = 0;

    @JSBody(params = {"type"}, script = "return new Event(type);")
    private static native Event createEvent(String type);

    @Test
    public void testRedundantEventListeners() {
        Slider slider = new Slider();
        callCount = 0;

        slider.addChangeHandler(e -> callCount++);

        // Create and dispatch 'input' event
        Event inputEvent = createEvent("input");
        slider.element.dispatchEvent(inputEvent);

        // Create and dispatch 'change' event
        Event changeEvent = createEvent("change");
        slider.element.dispatchEvent(changeEvent);

        // Optimized assertion: Only 'change' event triggers the listener
        assertEquals("Listener should be called once (optimized behavior)", 1, callCount);
    }
}
