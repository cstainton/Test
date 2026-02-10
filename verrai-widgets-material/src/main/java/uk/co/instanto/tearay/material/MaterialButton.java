package uk.co.instanto.tearay.material;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.EventListener;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class MaterialButton extends MaterialWidget {

    private HTMLElement label;
    private HTMLElement icon;

    public MaterialButton() {
        this.element = Window.current().getDocument().createElement("button");
        this.element.setClassName("mdc-button mdc-button--raised"); // Default to raised

        HTMLElement ripple = Window.current().getDocument().createElement("span");
        ripple.setClassName("mdc-button__ripple");
        this.element.appendChild(ripple);

        this.label = Window.current().getDocument().createElement("span");
        this.label.setClassName("mdc-button__label");
        this.element.appendChild(this.label);

        // Attach ripple
        MDCRipple.attachTo(this.element);
    }

    public void setText(String text) {
        this.label.setInnerText(text);
    }

    public void setIcon(String fontAwesomeClass) {
        if (icon == null) {
             icon = Window.current().getDocument().createElement("i");
             icon.setClassName("mdc-button__icon " + fontAwesomeClass);
             icon.setAttribute("aria-hidden", "true");
             // Insert before label
             this.element.insertBefore(icon, label);
        } else {
            icon.setClassName("mdc-button__icon " + fontAwesomeClass);
        }
    }

    public void setOutlined(boolean outlined) {
         if (outlined) {
             this.element.setClassName("mdc-button mdc-button--outlined");
         } else {
             this.element.setClassName("mdc-button mdc-button--raised");
         }
    }

    public void addClickListener(EventListener<?> listener) {
        this.element.addEventListener("click", listener);
    }

    // FAB implementation could be a subclass or a mode, let's keep it simple here or separate

    abstract static class MDCRipple implements JSObject {
        @JSBody(params = {"element"}, script = "if(typeof mdc !== 'undefined') return mdc.ripple.MDCRipple.attachTo(element); return null;")
        static native MDCRipple attachTo(HTMLElement element);
    }
}
