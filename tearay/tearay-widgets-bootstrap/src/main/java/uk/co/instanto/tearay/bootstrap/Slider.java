package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLInputElement;
import uk.co.instanto.tearay.api.TakesValue;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class Slider extends Widget implements TakesValue<Integer> {

    private HTMLInputElement input;

    public Slider() {
        this.element = Window.current().getDocument().createElement("input");
        this.input = (HTMLInputElement) this.element;
        this.input.setType("range");
        this.element.setClassName("form-range");
    }

    public void setMin(int min) {
        input.setAttribute("min", String.valueOf(min));
    }

    public void setMax(int max) {
        input.setAttribute("max", String.valueOf(max));
    }

    @Override
    public Integer getValue() {
        return Integer.parseInt(input.getValue());
    }

    @Override
    public void setValue(Integer value) {
        input.setValue(String.valueOf(value != null ? value : 0));
    }

    public void setValue(int value) {
        setValue(Integer.valueOf(value));
    }

    public void addChangeHandler(org.teavm.jso.dom.events.EventListener<?> listener) {
        this.element.addEventListener("change", listener);
    }
}
