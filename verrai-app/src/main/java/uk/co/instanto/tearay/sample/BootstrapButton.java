package uk.co.instanto.tearay.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;

public class BootstrapButton {
    public HTMLElement element;

    public BootstrapButton() {
        this.element = Window.current().getDocument().createElement("button");
        this.element.setClassName("btn");
    }

    public void addStyle(String style) {
        element.getClassList().add(style);
    }
}
