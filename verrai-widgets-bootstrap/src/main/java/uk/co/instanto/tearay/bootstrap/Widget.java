package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.dom.html.HTMLElement;
import uk.co.instanto.tearay.api.IsWidget;

public abstract class Widget implements IsWidget {
    public HTMLElement element;

    @Override
    public HTMLElement getElement() {
        return element;
    }
}
