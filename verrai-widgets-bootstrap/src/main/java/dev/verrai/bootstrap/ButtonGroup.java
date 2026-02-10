package dev.verrai.bootstrap;

import org.teavm.jso.browser.Window;

public class ButtonGroup extends Widget {

    public enum Size {
        DEFAULT(""),
        SMALL("btn-group-sm"),
        LARGE("btn-group-lg");

        private final String cssClass;
        Size(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    private boolean vertical = false;
    private Size size = Size.DEFAULT;

    public ButtonGroup() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setAttribute("role", "group");
        updateClass();
    }

    public void setVertical(boolean vertical) {
        this.vertical = vertical;
        updateClass();
    }

    public void setSize(Size size) {
        this.size = size;
        updateClass();
    }

    public void addButton(Widget button) {
        this.element.appendChild(button.element);
    }

    private void updateClass() {
        StringBuilder sb = new StringBuilder();
        if (vertical) {
            sb.append("btn-group-vertical");
        } else {
            sb.append("btn-group");
        }
        if (size != Size.DEFAULT) {
            sb.append(" ").append(size.getCssClass());
        }
        this.element.setClassName(sb.toString());
    }
}
