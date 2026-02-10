package dev.verrai.ui;

import dev.verrai.api.IsWidget;
import org.teavm.jso.dom.html.HTMLElement;

public class Composite implements IsWidget {

    public HTMLElement element;

    @Override
    public HTMLElement getElement() {
        return element;
    }

    protected void initWidget(IsWidget widget) {
        this.element = widget.getElement();
    }

    protected void initWidget(HTMLElement element) {
        this.element = element;
    }
}
