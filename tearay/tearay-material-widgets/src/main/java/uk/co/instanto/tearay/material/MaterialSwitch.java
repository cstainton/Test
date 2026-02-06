package uk.co.instanto.tearay.material;

import org.teavm.jso.browser.Window;

public class MaterialSwitch extends Widget {

    public MaterialSwitch() {
        this.element = Window.current().getDocument().createElement("md-switch");
    }

    public void setSelected(boolean selected) {
        if (selected) {
            this.element.setAttribute("selected", "");
        } else {
            this.element.removeAttribute("selected");
        }
    }

    public boolean isSelected() {
        return this.element.hasAttribute("selected");
    }
}
