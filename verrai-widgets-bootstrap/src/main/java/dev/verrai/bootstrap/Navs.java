package dev.verrai.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLAnchorElement;

public class Navs extends Widget {

    private boolean tabs = false;
    private boolean pills = false;
    private boolean fill = false;
    private boolean justified = false;

    public Navs() {
        this.element = Window.current().getDocument().createElement("ul");
        this.element.setClassName("nav");
    }

    public void setTabs(boolean tabs) {
        this.tabs = tabs;
        updateClass();
    }

    public void setPills(boolean pills) {
        this.pills = pills;
        updateClass();
    }

    public void setFill(boolean fill) {
        this.fill = fill;
        updateClass();
    }

    public void setJustified(boolean justified) {
        this.justified = justified;
        updateClass();
    }

    public void addLink(String text, String href, boolean active, boolean disabled) {
        HTMLElement li = Window.current().getDocument().createElement("li");
        li.setClassName("nav-item");

        HTMLAnchorElement a = (HTMLAnchorElement) Window.current().getDocument().createElement("a");
        String classes = "nav-link";
        if (active) classes += " active";
        if (disabled) classes += " disabled";
        a.setClassName(classes);
        a.setHref(href != null ? href : "#");
        a.setInnerText(text);
        if (active) a.setAttribute("aria-current", "page");
        if (disabled) {
            a.setAttribute("tabindex", "-1");
            a.setAttribute("aria-disabled", "true");
        }

        li.appendChild(a);
        this.element.appendChild(li);
    }

    public void addLink(String text, org.teavm.jso.dom.events.EventListener<?> handler, boolean active, boolean disabled) {
         HTMLElement li = Window.current().getDocument().createElement("li");
        li.setClassName("nav-item");

        HTMLAnchorElement a = (HTMLAnchorElement) Window.current().getDocument().createElement("a");
        String classes = "nav-link";
        if (active) classes += " active";
        if (disabled) classes += " disabled";
        a.setClassName(classes);
        a.setHref("#");
        a.setInnerText(text);

        if (active) a.setAttribute("aria-current", "page");
        if (disabled) {
            a.setAttribute("tabindex", "-1");
            a.setAttribute("aria-disabled", "true");
        } else if (handler != null) {
            a.addEventListener("click", handler);
        }

        li.appendChild(a);
        this.element.appendChild(li);
    }


    private void updateClass() {
        StringBuilder sb = new StringBuilder("nav");
        if (tabs) sb.append(" nav-tabs");
        if (pills) sb.append(" nav-pills");
        if (fill) sb.append(" nav-fill");
        if (justified) sb.append(" nav-justified");
        this.element.setClassName(sb.toString());
    }
}
