package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;

public class FloatingActionButton extends Button {
    private HTMLElement icon;

    public FloatingActionButton() {
        super();
        this.element.setClassName("btn btn-primary btn-floating");
    }

    @Override
    public void setType(Type type) {
        this.element.setClassName("btn " + type.getCssClass() + " btn-floating");
    }

    public void setIcon(String fontAwesomeClass) {
        if (icon == null) {
            icon = Window.current().getDocument().createElement("i");
            this.element.appendChild(icon);
        }
        icon.setClassName(fontAwesomeClass);
    }
}
