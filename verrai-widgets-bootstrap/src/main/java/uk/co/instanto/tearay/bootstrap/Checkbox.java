package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLInputElement;
import uk.co.instanto.tearay.api.TakesValue;

public class Checkbox extends Widget implements TakesValue<Boolean> {

    private HTMLInputElement input;
    private HTMLElement label;

    public Checkbox() {
        this("");
    }

    public Checkbox(String labelText) {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("form-check");

        input = (HTMLInputElement) Window.current().getDocument().createElement("input");
        input.setClassName("form-check-input");
        input.setType("checkbox");
        this.element.appendChild(input);

        label = Window.current().getDocument().createElement("label");
        label.setClassName("form-check-label");
        label.setInnerText(labelText);
        this.element.appendChild(label);
    }

    @Override
    public void setValue(Boolean checked) {
        input.setChecked(checked != null && checked);
    }

    @Override
    public Boolean getValue() {
        return input.isChecked();
    }

    public void addChangeHandler(org.teavm.jso.dom.events.EventListener<?> listener) {
        input.addEventListener("change", listener);
    }
}
