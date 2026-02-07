package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLAnchorElement;

public class Pagination extends Widget {

    public enum Size {
        DEFAULT(""),
        SMALL("pagination-sm"),
        LARGE("pagination-lg");

        private final String cssClass;
        Size(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    public enum Alignment {
        START("justify-content-start"),
        CENTER("justify-content-center"),
        END("justify-content-end");

        private final String cssClass;
        Alignment(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    private HTMLElement ul;
    private Size size = Size.DEFAULT;
    private Alignment alignment = Alignment.START;

    public Pagination() {
        this.element = Window.current().getDocument().createElement("nav");
        this.element.setAttribute("aria-label", "Page navigation");

        this.ul = Window.current().getDocument().createElement("ul");
        this.element.appendChild(this.ul);
        updateClass();
    }

    public void setSize(Size size) {
        this.size = size;
        updateClass();
    }

    public void setAlignment(Alignment alignment) {
        this.alignment = alignment;
        updateClass();
    }

    public void addItem(String text, boolean active, boolean disabled, org.teavm.jso.dom.events.EventListener<?> handler) {
        HTMLElement li = Window.current().getDocument().createElement("li");
        li.setClassName("page-item" + (active ? " active" : "") + (disabled ? " disabled" : ""));

        HTMLAnchorElement a = (HTMLAnchorElement) Window.current().getDocument().createElement("a");
        a.setClassName("page-link");
        a.setHref("#");
        a.setInnerText(text);
        if (disabled) {
            a.setAttribute("tabindex", "-1");
            a.setAttribute("aria-disabled", "true");
        }
        if (active) {
            li.setAttribute("aria-current", "page");
        }

        if (!disabled && handler != null) {
            a.addEventListener("click", handler);
        }

        li.appendChild(a);
        this.ul.appendChild(li);
    }

    public void clear() {
        this.ul.setInnerText("");
    }

    private void updateClass() {
        StringBuilder sb = new StringBuilder("pagination");
        if (size != Size.DEFAULT) {
            sb.append(" ").append(size.getCssClass());
        }
        if (alignment != null) {
            sb.append(" ").append(alignment.getCssClass());
        }
        this.ul.setClassName(sb.toString());
    }
}
