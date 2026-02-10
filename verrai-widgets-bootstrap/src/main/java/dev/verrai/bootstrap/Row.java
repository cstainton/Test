package dev.verrai.bootstrap;

import org.teavm.jso.browser.Window;

public class Row extends Widget {
    public Row() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("row");
    }
}
