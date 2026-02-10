package dev.verrai.bootstrap;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.html.HTMLElement;

public class Popover {

    public enum Placement {
        TOP("top"),
        BOTTOM("bottom"),
        LEFT("left"),
        RIGHT("right");

        private final String value;
        Placement(String value) { this.value = value; }
        public String getValue() { return value; }
    }

    private final Widget target;

    public Popover(Widget target) {
        this.target = target;
        this.target.element.setAttribute("data-bs-toggle", "popover");
    }

    public void setTitle(String title) {
        this.target.element.setAttribute("title", title);
    }

    public void setContent(String content) {
        this.target.element.setAttribute("data-bs-content", content);
    }

    public void setPlacement(Placement placement) {
        this.target.element.setAttribute("data-bs-placement", placement.getValue());
    }

    public void init() {
        BootstrapPopoverJSO.getOrCreateInstance(this.target.element);
    }

    abstract static class BootstrapPopoverJSO implements JSObject {
        @JSBody(params = {"element"}, script = "return new bootstrap.Popover(element);")
        static native BootstrapPopoverJSO getOrCreateInstance(HTMLElement element);
    }
}
