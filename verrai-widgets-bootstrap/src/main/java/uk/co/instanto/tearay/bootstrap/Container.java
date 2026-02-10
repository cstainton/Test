package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class Container extends Widget {
    public Container() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("container");
    }
}
