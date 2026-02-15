package dev.verrai.app;

import dev.verrai.api.IsWidget;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.Event;
import dev.verrai.api.Dependent;

@Dependent
public class MyWidget implements IsWidget {
    public HTMLElement element;
    @Override
    public HTMLElement getElement() { return element; }
    @Override
    public void onBrowserEvent(Event e) {}
}
