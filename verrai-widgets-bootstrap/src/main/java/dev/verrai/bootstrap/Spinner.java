package dev.verrai.bootstrap;

import org.teavm.jso.browser.Window;

public class Spinner extends Widget {

    public enum Type {
        BORDER("spinner-border"),
        GROW("spinner-grow");

        private final String cssClass;
        Type(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    public enum Color {
        PRIMARY("text-primary"),
        SECONDARY("text-secondary"),
        SUCCESS("text-success"),
        DANGER("text-danger"),
        WARNING("text-warning"),
        INFO("text-info"),
        LIGHT("text-light"),
        DARK("text-dark");

        private final String cssClass;
        Color(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    public enum Size {
        DEFAULT(""),
        SMALL("sm");

        private final String suffix;
        Size(String suffix) { this.suffix = suffix; }
        public String getSuffix() { return suffix; }
    }

    private Type type = Type.BORDER;
    private Color color;
    private Size size = Size.DEFAULT;

    public Spinner() {
        this(Type.BORDER);
    }

    public Spinner(Type type) {
        this.type = type;
        this.element = Window.current().getDocument().createElement("div");
        this.element.setAttribute("role", "status");

        // Add visually hidden loading text for accessibility
        org.teavm.jso.dom.html.HTMLElement span = Window.current().getDocument().createElement("span");
        span.setClassName("visually-hidden");
        span.setInnerText("Loading...");
        this.element.appendChild(span);

        updateClass();
    }

    public void setType(Type type) {
        this.type = type;
        updateClass();
    }

    public void setColor(Color color) {
        this.color = color;
        updateClass();
    }

    public void setSize(Size size) {
        this.size = size;
        updateClass();
    }

    private void updateClass() {
        StringBuilder sb = new StringBuilder();
        if (type != null) {
            sb.append(type.getCssClass());
            if (size == Size.SMALL) {
                sb.append(" ").append(type.getCssClass()).append("-sm");
            }
        }
        if (color != null) {
            sb.append(" ").append(color.getCssClass());
        }
        this.element.setClassName(sb.toString());
    }
}
