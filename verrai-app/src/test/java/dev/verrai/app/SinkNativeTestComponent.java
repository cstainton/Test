package dev.verrai.app;

import dev.verrai.api.Templated;
import dev.verrai.api.DataField;
import dev.verrai.api.SinkNative;
import dev.verrai.api.IsWidget;
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
