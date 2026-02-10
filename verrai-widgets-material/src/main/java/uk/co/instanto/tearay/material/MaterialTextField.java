package uk.co.instanto.tearay.material;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLInputElement;
import uk.co.instanto.tearay.api.TakesValue;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class MaterialTextField extends MaterialWidget implements TakesValue<String> {

    private HTMLInputElement input;
    private HTMLElement label;
    private MDCTextField instance;

    public MaterialTextField() {
        this("");
    }

    public MaterialTextField(String labelText) {
        this.element = Window.current().getDocument().createElement("label");
        this.element.setClassName("mdc-text-field mdc-text-field--filled");

        HTMLElement ripple = Window.current().getDocument().createElement("span");
        ripple.setClassName("mdc-text-field__ripple");
        this.element.appendChild(ripple);

        // Floating label
        this.label = Window.current().getDocument().createElement("span");
        this.label.setClassName("mdc-floating-label");
        this.label.setInnerText(labelText);
        this.element.appendChild(this.label);

        // Input
        this.input = (HTMLInputElement) Window.current().getDocument().createElement("input");
        this.input.setClassName("mdc-text-field__input");
        this.input.setAttribute("type", "text");
        String id = "mdc-input-" + (int)(Math.random() * 10000);
        this.input.setAttribute("aria-labelledby", id);
        this.label.setAttribute("id", id);
        this.element.appendChild(this.input);

        // Line Ripple
        HTMLElement lineRipple = Window.current().getDocument().createElement("span");
        lineRipple.setClassName("mdc-line-ripple");
        this.element.appendChild(lineRipple);

        // Attach
        this.instance = MDCTextField.attachTo(this.element);
    }

    @Override
    public void setValue(String value) {
        input.setValue(value);
    }

    @Override
    public String getValue() {
        return input.getValue();
    }

    abstract static class MDCTextField implements JSObject {
        @JSBody(params = {"element"}, script = "if(typeof mdc !== 'undefined') return mdc.textField.MDCTextField.attachTo(element); return null;")
        static native MDCTextField attachTo(HTMLElement element);
    }
}
