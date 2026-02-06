package uk.co.instanto.tearay.material;

import org.teavm.jso.browser.Window;

public class MaterialTextField extends Widget {

    public MaterialTextField() {
        this.element = Window.current().getDocument().createElement("md-outlined-text-field");
    }

    public void setLabel(String label) {
        this.element.setAttribute("label", label);
    }

    public void setValue(String value) {
        this.element.setAttribute("value", value);
    }

    public String getValue() {
        return this.element.getAttribute("value");
    }
}
