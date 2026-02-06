package uk.co.instanto.tearay.material;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.events.EventListener;

public class MaterialButton extends Widget {

    public MaterialButton() {
        this.element = Window.current().getDocument().createElement("md-filled-button");
    }

    public void setLabel(String label) {
        this.element.setInnerText(label);
    }

    public void addClickListener(EventListener<?> listener) {
        this.element.addEventListener("click", listener);
    }
}
