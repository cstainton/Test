package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLInputElement;

public class RadioButton extends Widget {

    private HTMLInputElement input;
    private HTMLElement label;

    public RadioButton() {
        this("", "");
    }

    public RadioButton(String name, String labelText) {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("form-check");

        input = (HTMLInputElement) Window.current().getDocument().createElement("input");
        input.setClassName("form-check-input");
        input.setType("radio");
        input.setName(name);
        this.element.appendChild(input);

        label = Window.current().getDocument().createElement("label");
        label.setClassName("form-check-label");
        label.setInnerText(labelText);
        this.element.appendChild(label);
    }

    public void setValue(String value) {
        input.setValue(value);
    }

    public String getValue() {
        return input.getValue();
    }

    public void setChecked(boolean checked) {
        input.setChecked(checked);
    }

    public boolean isChecked() {
        return input.isChecked();
    }

    public void addChangeHandler(org.teavm.jso.dom.events.EventListener<?> listener) {
        input.addEventListener("change", listener);
    }
}
