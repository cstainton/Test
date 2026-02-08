package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;

public class FloatingLabel extends Widget {
    private Widget input;
    private HTMLElement label;

    public FloatingLabel() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("form-floating mb-3");
    }

    public void setInput(Widget input) {
        if (this.input != null) {
            this.element.removeChild(this.input.getElement());
        }
        this.input = input;

        // Input must be before label
        if (this.label != null && this.label.getParentNode() == this.element) {
            this.element.insertBefore(input.getElement(), this.label);
        } else {
            this.element.appendChild(input.getElement());
        }

        // Ensure ID linkage
        ensureIdLinkage();
    }

    public void setLabel(String text) {
        if (this.label == null) {
            this.label = Window.current().getDocument().createElement("label");
            this.element.appendChild(this.label);
        }
        this.label.setInnerText(text);
        ensureIdLinkage();
    }

    private void ensureIdLinkage() {
        if (this.input != null && this.label != null) {
            String id = this.input.getElement().getAttribute("id");
            if (id == null || id.isEmpty()) {
                id = "floatingInput_" + (int)(Math.random() * 100000);
                this.input.getElement().setAttribute("id", id);
            }
            this.label.setAttribute("for", id);
        }
    }
}
