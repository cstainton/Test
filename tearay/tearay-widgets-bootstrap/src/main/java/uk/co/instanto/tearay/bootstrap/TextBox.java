package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLInputElement;
import uk.co.instanto.tearay.api.TakesValue;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class TextBox extends Widget implements TakesValue<String> {

    private HTMLInputElement input;

    public TextBox() {
        this.element = Window.current().getDocument().createElement("input");
        this.input = (HTMLInputElement) this.element;
        this.input.setType("text");
        this.element.setClassName("form-control");
    }

    @Override
    public void setValue(String value) {
        input.setValue(value);
    }

    @Override
    public String getValue() {
        return input.getValue();
    }

    public void addChangeHandler(org.teavm.jso.dom.events.EventListener<?> listener) {
        this.element.addEventListener("change", listener);
    }
}
