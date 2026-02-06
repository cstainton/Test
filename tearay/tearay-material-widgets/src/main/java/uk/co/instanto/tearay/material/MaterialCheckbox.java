package uk.co.instanto.tearay.material;

import org.teavm.jso.browser.Window;

public class MaterialCheckbox extends Widget {

    public MaterialCheckbox() {
        this.element = Window.current().getDocument().createElement("md-checkbox");
    }

    public void setChecked(boolean checked) {
        if (checked) {
            this.element.setAttribute("checked", "");
        } else {
            this.element.removeAttribute("checked");
        }
    }

    public boolean isChecked() {
        return this.element.hasAttribute("checked");
    }
}
