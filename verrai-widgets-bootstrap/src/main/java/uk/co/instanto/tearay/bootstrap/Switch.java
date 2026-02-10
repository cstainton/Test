package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLInputElement;
import uk.co.instanto.tearay.api.TakesValue;

public class Switch extends Widget implements TakesValue<Boolean> {

    private HTMLInputElement input;
    private HTMLElement label;

    public Switch() {
        this("");
    }

    public Switch(String labelText) {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("form-check form-switch");

        input = (HTMLInputElement) Window.current().getDocument().createElement("input");
        input.setClassName("form-check-input");
        input.setType("checkbox");
        this.element.appendChild(input);

        label = Window.current().getDocument().createElement("label");
        label.setClassName("form-check-label");
        label.setInnerText(labelText);
        this.element.appendChild(label);
    }

    public void setChecked(boolean checked) {
        input.setChecked(checked);
    }

    public boolean isChecked() {
        return input.isChecked();
    }

    @Override
    public void setValue(Boolean value) {
        setChecked(value != null && value);
    }

    @Override
    public Boolean getValue() {
        return isChecked();
    }

    public void addChangeHandler(org.teavm.jso.dom.events.EventListener<?> listener) {
        input.addEventListener("change", listener);
    }
}
