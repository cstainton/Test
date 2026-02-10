package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;

public class Column extends Widget {
    public Column() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("col");
    }

    public Column span(int size) {
        this.element.setClassName("col-" + size);
        return this;
    }
}
