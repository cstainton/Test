package dev.verrai.bootstrap;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.xml.Element;
import java.util.List;
import java.util.ArrayList;

public class SimpleList extends Widget {

    private boolean ordered = false;
    private HTMLElement listElement;

    public SimpleList() {
        this(false);
    }

    public SimpleList(boolean ordered) {
        this.ordered = ordered;
        this.listElement = Window.current().getDocument().createElement(ordered ? "ol" : "ul");
        // Bootstrap List Group classes
        this.listElement.setClassName("list-group" + (ordered ? " list-group-numbered" : ""));
        this.element = this.listElement;
    }

    public void addItem(String text) {
        HTMLElement li = Window.current().getDocument().createElement("li");
        li.setClassName("list-group-item");
        li.setInnerText(text);
        listElement.appendChild(li);
    }

    public void addItem(Widget widget) {
        HTMLElement li = Window.current().getDocument().createElement("li");
        li.setClassName("list-group-item");
        li.appendChild(widget.element);
        listElement.appendChild(li);
    }

    public void clear() {
        listElement.setInnerText("");
    }
}
