package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;

public class Navbar extends Widget {

    private HTMLElement container;
    private HTMLElement brand;
    private HTMLElement navList;

    public Navbar() {
        this.element = Window.current().getDocument().createElement("nav");
        this.element.setClassName("navbar navbar-expand-lg navbar-light bg-light");

        container = Window.current().getDocument().createElement("div");
        container.setClassName("container-fluid");
        this.element.appendChild(container);

        brand = Window.current().getDocument().createElement("a");
        brand.setClassName("navbar-brand");
        brand.setAttribute("href", "#");
        container.appendChild(brand);

        // Simple structure for PoC (no toggler logic yet)
        HTMLElement collapse = Window.current().getDocument().createElement("div");
        collapse.setClassName("collapse navbar-collapse");
        container.appendChild(collapse);

        navList = Window.current().getDocument().createElement("ul");
        navList.setClassName("navbar-nav me-auto mb-2 mb-lg-0");
        collapse.appendChild(navList);
    }

    public void setBrand(String text) {
        brand.setInnerText(text);
    }

    public void setSticky(boolean sticky) {
        if (sticky) {
            this.element.setClassName(this.element.getClassName() + " sticky-top");
        } else {
            this.element.setClassName(this.element.getClassName().replace(" sticky-top", ""));
        }
    }

    public void addLink(String text, org.teavm.jso.dom.events.EventListener<?> handler) {
        HTMLElement li = Window.current().getDocument().createElement("li");
        li.setClassName("nav-item");

        HTMLElement a = Window.current().getDocument().createElement("a");
        a.setClassName("nav-link");
        a.setInnerText(text);
        a.setAttribute("href", "#");
        a.addEventListener("click", handler);

        li.appendChild(a);
        navList.appendChild(li);
    }
}
