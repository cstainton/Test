package dev.verrai.bootstrap;

import org.teavm.jso.dom.html.HTMLElement;
import dev.verrai.api.IsWidget;

public abstract class Widget implements IsWidget {
    public HTMLElement element;

    @Override
    public HTMLElement getElement() {
        return element;
    }
}
