package uk.co.instanto.tearay.api;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.Event;

public interface IsWidget {
    HTMLElement getElement();

    /**
     * Called when a native event, sunk by {@link SinkNative}, is fired on this widget's element.
     * Default implementation does nothing. Override to handle events.
     *
     * @param event The native event.
     */
    default void onBrowserEvent(Event event) {}
}
