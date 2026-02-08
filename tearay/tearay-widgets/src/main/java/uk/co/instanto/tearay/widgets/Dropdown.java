package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLButtonElement;

public class Dropdown extends Widget {
    private HTMLElement menu;
    private HTMLButtonElement button;

    public Dropdown() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("dropdown");

        this.button = (HTMLButtonElement) Window.current().getDocument().createElement("button");
        this.button.setClassName("btn btn-primary dropdown-toggle");
        this.button.setAttribute("type", "button");
        // Using data-mdb-toggle for MDB 5 compatibility, though data-bs-toggle also works
        this.button.setAttribute("data-mdb-toggle", "dropdown");
        this.button.setAttribute("aria-expanded", "false");
        this.element.appendChild(this.button);

        this.menu = Window.current().getDocument().createElement("ul");
        this.menu.setClassName("dropdown-menu");
        this.element.appendChild(this.menu);
    }

    public void setText(String text) {
        this.button.setInnerText(text);
    }

    public void addItem(String text, Runnable action) {
        HTMLElement li = Window.current().getDocument().createElement("li");
        HTMLElement a = Window.current().getDocument().createElement("a");
        a.setClassName("dropdown-item");
        a.setAttribute("href", "#");
        a.setInnerText(text);
        a.addEventListener("click", (e) -> {
            e.preventDefault();
            if (action != null) action.run();
        });
        li.appendChild(a);
        this.menu.appendChild(li);
    }
}
