package uk.co.instanto.tearay.sample;

import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.MouseEvent;
import org.teavm.jso.dom.html.HTMLElement;
import uk.co.instanto.tearay.api.*;
import uk.co.instanto.tearay.widgets.Button;

import javax.inject.Inject;

@Page(role = "test-event")
@Templated
public class EventHandlerTestPage {

    @Inject @DataField
    public Button btnWidget;

    @DataField
    public HTMLElement btnElement;

    // btnUnmapped is not a field, just a template element

    public boolean widgetClicked = false;
    public boolean elementClicked = false;
    public boolean unmappedClicked = false;
    public HTMLElement element;

    @EventHandler("btnWidget")
    public void onWidgetClick(Event e) {
        widgetClicked = true;
    }

    @EventHandler("btnElement")
    public void onElementClick(MouseEvent e) {
        elementClicked = true;
    }

    @EventHandler("btnUnmapped")
    public void onUnmappedClick() {
        unmappedClicked = true;
    }
}
