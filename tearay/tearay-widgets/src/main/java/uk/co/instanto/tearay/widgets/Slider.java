package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLInputElement;

public class Slider extends Widget {

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

    public int getValue() {
        return Integer.parseInt(input.getValue());
    }

    public void setValue(int value) {
        input.setValue(String.valueOf(value));
    }

    public void addChangeHandler(org.teavm.jso.dom.events.EventListener<?> listener) {
        this.element.addEventListener("change", listener);
    }
}
