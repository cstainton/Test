package uk.co.instanto.tearay.material;

import org.teavm.jso.dom.html.HTMLElement;
import uk.co.instanto.tearay.api.IsWidget;

public abstract class MaterialWidget implements IsWidget {
    public HTMLElement element;

    @Override
    public HTMLElement getElement() {
        return element;
    }
}
