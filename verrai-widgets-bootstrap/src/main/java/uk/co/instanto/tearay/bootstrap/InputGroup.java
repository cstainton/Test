package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;

public class InputGroup extends Widget {

    public enum Size {
        DEFAULT(""),
        SMALL("input-group-sm"),
        LARGE("input-group-lg");

        private final String cssClass;
        Size(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    private Size size = Size.DEFAULT;

    public InputGroup() {
        this.element = Window.current().getDocument().createElement("div");
        updateClass();
    }

    public void setSize(Size size) {
        this.size = size;
        updateClass();
    }

    public void prependText(String text) {
        HTMLElement span = Window.current().getDocument().createElement("span");
        span.setClassName("input-group-text");
        span.setInnerText(text);
        if (this.element.getFirstChild() != null) {
            this.element.insertBefore(span, this.element.getFirstChild());
        } else {
            this.element.appendChild(span);
        }
    }

    public void appendText(String text) {
        HTMLElement span = Window.current().getDocument().createElement("span");
        span.setClassName("input-group-text");
        span.setInnerText(text);
        this.element.appendChild(span);
    }

    public void prepend(Widget widget) {
        if (this.element.getFirstChild() != null) {
            this.element.insertBefore(widget.element, this.element.getFirstChild());
        } else {
            this.element.appendChild(widget.element);
        }
    }

    public void append(Widget widget) {
        this.element.appendChild(widget.element);
    }

    public void addControl(Widget widget) {
        this.element.appendChild(widget.element);
    }

    private void updateClass() {
        StringBuilder sb = new StringBuilder("input-group");
        if (size != Size.DEFAULT) {
            sb.append(" ").append(size.getCssClass());
        }
        this.element.setClassName(sb.toString());
    }
}
