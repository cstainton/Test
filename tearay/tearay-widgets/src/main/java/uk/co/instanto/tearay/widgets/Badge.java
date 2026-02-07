package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.api.TakesValue;

public class Badge extends Widget implements TakesValue<String> {

    public enum Color {
        PRIMARY("bg-primary"),
        SECONDARY("bg-secondary"),
        SUCCESS("bg-success"),
        DANGER("bg-danger"),
        WARNING("bg-warning"),
        INFO("bg-info"),
        LIGHT("bg-light text-dark"),
        DARK("bg-dark");

        private final String cssClass;

        Color(String cssClass) {
            this.cssClass = cssClass;
        }

        public String getCssClass() {
            return cssClass;
        }
    }

    private Color color = Color.SECONDARY;
    private boolean roundedPill = false;

    public Badge() {
        this.element = Window.current().getDocument().createElement("span");
        updateClass();
    }

    public Badge(String text) {
        this();
        setText(text);
    }

    public Badge(String text, Color color) {
        this();
        setText(text);
        setColor(color);
    }

    public void setText(String text) {
        this.element.setInnerText(text);
    }

    @Override
    public void setValue(String value) {
        setText(value);
    }

    @Override
    public String getValue() {
        return this.element.getInnerText();
    }

    public void setColor(Color color) {
        this.color = color;
        updateClass();
    }

    public void setRoundedPill(boolean roundedPill) {
        this.roundedPill = roundedPill;
        updateClass();
    }

    private void updateClass() {
        StringBuilder sb = new StringBuilder("badge");
        if (color != null) {
            sb.append(" ").append(color.getCssClass());
        }
        if (roundedPill) {
            sb.append(" rounded-pill");
        }
        this.element.setClassName(sb.toString());
    }
}
