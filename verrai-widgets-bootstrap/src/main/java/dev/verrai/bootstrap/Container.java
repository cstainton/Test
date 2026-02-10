package dev.verrai.bootstrap;

import org.teavm.jso.browser.Window;
import dev.verrai.api.Dependent;

@Dependent
public class Container extends Widget {
    public Container() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("container");
    }
}
