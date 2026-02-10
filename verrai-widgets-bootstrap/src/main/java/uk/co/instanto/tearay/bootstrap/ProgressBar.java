package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import uk.co.instanto.tearay.api.TakesValue;

public class ProgressBar extends Widget implements TakesValue<Integer> {

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

    private HTMLElement bar;
    private int min = 0;
    private int max = 100;
    private int value = 0;
    private boolean striped = false;
    private boolean animated = false;
    private Color color = Color.PRIMARY;

    public ProgressBar() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("progress");
        this.bar = Window.current().getDocument().createElement("div");
        this.bar.setClassName("progress-bar");
        this.bar.setAttribute("role", "progressbar");
        this.element.appendChild(this.bar);
        update();
        updateClass();
    }

    @Override
    public void setValue(Integer value) {
        this.value = value != null ? value : min;
        update();
    }

    @Override
    public Integer getValue() {
        return value;
    }

    public void setMin(int min) {
        this.min = min;
        update();
    }

    public void setMax(int max) {
        this.max = max;
        update();
    }

    public void setLabel(String label) {
        this.bar.setInnerText(label);
    }

    public void setStriped(boolean striped) {
        this.striped = striped;
        updateClass();
    }

    public void setAnimated(boolean animated) {
        this.animated = animated;
        updateClass();
    }

    public void setColor(Color color) {
        this.color = color;
        updateClass();
    }

    private void update() {
        this.bar.setAttribute("aria-valuenow", String.valueOf(value));
        this.bar.setAttribute("aria-valuemin", String.valueOf(min));
        this.bar.setAttribute("aria-valuemax", String.valueOf(max));
        double percent = (double) (value - min) / (max - min) * 100;
        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;
        this.bar.setAttribute("style", "width: " + percent + "%");
    }

    private void updateClass() {
        StringBuilder sb = new StringBuilder("progress-bar");
        if (color != null) {
            sb.append(" ").append(color.getCssClass());
        }
        if (striped) {
            sb.append(" progress-bar-striped");
        }
        if (animated) {
            sb.append(" progress-bar-animated");
        }
        this.bar.setClassName(sb.toString());
    }
}
