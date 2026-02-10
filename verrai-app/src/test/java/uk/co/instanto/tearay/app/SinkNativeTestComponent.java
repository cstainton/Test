package uk.co.instanto.tearay.app;

import uk.co.instanto.tearay.api.Templated;
import uk.co.instanto.tearay.api.DataField;
import uk.co.instanto.tearay.api.SinkNative;
import uk.co.instanto.tearay.api.IsWidget;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.Event;
import javax.inject.Inject;

@Templated("SinkNativeTestComponent.html")
public class SinkNativeTestComponent {

    @Inject
    @DataField
    @SinkNative({"click", "mouseover"})
    public MyWidget myWidget;

    public static class MyWidget implements IsWidget {
        public HTMLElement element;
        @Override
        public HTMLElement getElement() { return element; }
        @Override
        public void onBrowserEvent(Event e) {}
    }
}
