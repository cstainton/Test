package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class Button extends Widget {

    public enum Type {
        PRIMARY("btn-primary"),
        SUCCESS("btn-success"),
        DANGER("btn-danger"),
        WARNING("btn-warning"),
        INFO("btn-info");

        private final String cssClass;
        Type(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    public Button() {
        this.element = Window.current().getDocument().createElement("button");
        this.element.setClassName("btn");
    }

    public void setText(String text) {
        this.element.setInnerText(text);
    }

    public void setType(Type type) {
        this.element.setClassName("btn " + type.getCssClass());
    }

    public void addClickListener(org.teavm.jso.dom.events.EventListener<?> listener) {
        this.element.addEventListener("click", listener);
    }
}
