package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLAnchorElement;

public class Breadcrumb extends Widget {

    private HTMLElement ol;

    public Breadcrumb() {
        this.element = Window.current().getDocument().createElement("nav");
        this.element.setAttribute("aria-label", "breadcrumb");
        this.ol = Window.current().getDocument().createElement("ol");
        this.ol.setClassName("breadcrumb");
        this.element.appendChild(this.ol);
    }

    public void addItem(String text, String href) {
        HTMLElement li = Window.current().getDocument().createElement("li");
        li.setClassName("breadcrumb-item");

        HTMLAnchorElement a = (HTMLAnchorElement) Window.current().getDocument().createElement("a");
        a.setHref(href);
        a.setInnerText(text);

        li.appendChild(a);
        this.ol.appendChild(li);
    }

    public void addActiveItem(String text) {
        HTMLElement li = Window.current().getDocument().createElement("li");
        li.setClassName("breadcrumb-item active");
        li.setAttribute("aria-current", "page");
        li.setInnerText(text);

        this.ol.appendChild(li);
    }

    public void clear() {
        this.ol.setInnerText("");
    }
}
