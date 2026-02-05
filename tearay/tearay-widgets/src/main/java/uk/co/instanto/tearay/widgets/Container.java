package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;

public class Container extends Widget {
    public Container() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("container");
    }
}
