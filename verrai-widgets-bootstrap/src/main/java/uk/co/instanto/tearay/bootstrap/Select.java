package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLSelectElement;
import org.teavm.jso.dom.html.HTMLOptionElement;
import uk.co.instanto.tearay.api.TakesValue;

public class Select extends Widget implements TakesValue<String> {

    public enum Size {
        DEFAULT(""),
        SMALL("form-select-sm"),
        LARGE("form-select-lg");

        private final String cssClass;
        Size(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    private HTMLSelectElement select;
    private Size size = Size.DEFAULT;

    public Select() {
        this.element = Window.current().getDocument().createElement("select");
        this.select = (HTMLSelectElement) this.element;
        updateClass();
    }

    public void addOption(String text, String value) {
        HTMLOptionElement option = (HTMLOptionElement) Window.current().getDocument().createElement("option");
        option.setInnerText(text);
        option.setValue(value);
        this.select.appendChild(option);
    }

    public void setSize(Size size) {
        this.size = size;
        updateClass();
    }

    public void setDisabled(boolean disabled) {
        this.select.setDisabled(disabled);
    }

    @Override
    public void setValue(String value) {
        this.select.setValue(value);
    }

    @Override
    public String getValue() {
        return this.select.getValue();
    }

    private void updateClass() {
        String base = "form-select";
        if (size != Size.DEFAULT) {
            base += " " + size.getCssClass();
        }
        this.element.setClassName(base);
    }
}
