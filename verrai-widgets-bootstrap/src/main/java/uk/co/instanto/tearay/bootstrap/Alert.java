package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;

public class Alert extends Widget {

    public enum Type {
        PRIMARY("alert-primary"),
        SUCCESS("alert-success"),
        DANGER("alert-danger"),
        WARNING("alert-warning"),
        INFO("alert-info");

        private final String cssClass;
        Type(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    public Alert() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("alert");
        this.element.setAttribute("role", "alert");
    }

    public void setText(String text) {
        this.element.setInnerText(text);
    }

    public void setType(Type type) {
        this.element.setClassName("alert " + type.getCssClass());
    }
}
