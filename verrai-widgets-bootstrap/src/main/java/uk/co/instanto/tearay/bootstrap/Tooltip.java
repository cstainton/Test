package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.html.HTMLElement;

public class Tooltip {

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

    public Tooltip(Widget target) {
        this.target = target;
        this.target.element.setAttribute("data-bs-toggle", "tooltip");
    }

    public void setTitle(String title) {
        this.target.element.setAttribute("title", title);
    }

    public void setPlacement(Placement placement) {
        this.target.element.setAttribute("data-bs-placement", placement.getValue());
    }

    public void init() {
        BootstrapTooltipJSO.getOrCreateInstance(this.target.element);
    }

    abstract static class BootstrapTooltipJSO implements JSObject {
        @JSBody(params = {"element"}, script = "return new bootstrap.Tooltip(element);")
        static native BootstrapTooltipJSO getOrCreateInstance(HTMLElement element);
    }
}
