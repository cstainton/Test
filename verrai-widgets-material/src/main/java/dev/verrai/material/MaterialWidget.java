package dev.verrai.material;

import org.teavm.jso.dom.html.HTMLElement;
import dev.verrai.api.IsWidget;

public abstract class MaterialWidget implements IsWidget {
    public HTMLElement element;

    @Override
    public HTMLElement getElement() {
        return element;
    }
}
