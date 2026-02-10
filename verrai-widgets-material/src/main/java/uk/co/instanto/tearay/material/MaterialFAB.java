package uk.co.instanto.tearay.material;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.EventListener;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class MaterialFAB extends MaterialWidget {

    private HTMLElement icon;

    public MaterialFAB() {
        this("add"); // Default icon
    }

    public MaterialFAB(String iconClass) {
        this.element = Window.current().getDocument().createElement("button");
        this.element.setClassName("mdc-fab");
        this.element.setAttribute("aria-label", "Action");

        HTMLElement ripple = Window.current().getDocument().createElement("div");
        ripple.setClassName("mdc-fab__ripple");
        this.element.appendChild(ripple);

        this.icon = Window.current().getDocument().createElement("span");
        this.icon.setClassName("mdc-fab__icon material-icons");
        this.icon.setInnerText(iconClass); // Assumes Material Icons font
        this.element.appendChild(this.icon);

        // Attach ripple
        MDCRipple.attachTo(this.element);
    }

    public void addClickListener(EventListener<?> listener) {
        this.element.addEventListener("click", listener);
    }

    abstract static class MDCRipple implements JSObject {
        @JSBody(params = {"element"}, script = "if(typeof mdc !== 'undefined') return mdc.ripple.MDCRipple.attachTo(element); return null;")
        static native MDCRipple attachTo(HTMLElement element);
    }
}
