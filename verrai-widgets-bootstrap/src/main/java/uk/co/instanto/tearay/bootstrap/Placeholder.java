package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;

public class Placeholder extends Widget {

    public enum Size {
        DEFAULT(""),
        XS("placeholder-xs"),
        SM("placeholder-sm"),
        LG("placeholder-lg");

        private final String cssClass;
        Size(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    public enum Animation {
        NONE(""),
        GLOW("placeholder-glow"),
        WAVE("placeholder-wave");

        private final String cssClass;
        Animation(String cssClass) { this.cssClass = cssClass; }
        public String getCssClass() { return cssClass; }
    }

    private int columns = 12;
    private Size size = Size.DEFAULT;
    private Animation animation = Animation.GLOW;

    public Placeholder() {
        // Typically a paragraph wrapper is used for animation context,
        // and the span is the actual placeholder bar.
        // For simplicity, we'll wrap a span inside a p/div context if animation is set,
        // or just return the span. But to be a single 'Widget', let's make the root the container
        // if needed, or just the span if the user handles the container.

        // Bootstrap docs:
        // <p class="placeholder-glow"><span class="placeholder col-12"></span></p>

        // Let's implement this widget as the *wrapper* (p/div) that contains the span(s),
        // OR just the span itself.
        // If we want a simple usage: new Placeholder(6) -> <span class="placeholder col-6"></span>
        // BUT animation classes (.placeholder-glow) go on the PARENT.

        // Decision: This widget represents the `span.placeholder`.
        // Providing a separate 'PlaceholderContainer' might be overkill,
        // but let's see if we can self-contain it.
        // If we make the root a `p` or `div` with glow/wave, and put a span inside.

        this.element = Window.current().getDocument().createElement("p");
        this.element.setAttribute("aria-hidden", "true");

        org.teavm.jso.dom.html.HTMLElement span = Window.current().getDocument().createElement("span");
        this.element.appendChild(span);

        updateClass();
    }

    public void setColumns(int columns) {
        if (columns < 1) columns = 1;
        if (columns > 12) columns = 12;
        this.columns = columns;
        updateClass();
    }

    public void setSize(Size size) {
        this.size = size;
        updateClass();
    }

    public void setAnimation(Animation animation) {
        this.animation = animation;
        updateClass();
    }

    private void updateClass() {
        // Parent classes (Animation)
        String parentClass = (animation != null) ? animation.getCssClass() : "";
        this.element.setClassName(parentClass);

        // Child classes (Placeholder + Col + Size)
        StringBuilder sb = new StringBuilder("placeholder");
        sb.append(" col-").append(columns);
        if (size != Size.DEFAULT) {
            sb.append(" ").append(size.getCssClass());
        }

        // element is the <p>, firstChild is the <span>
        if (this.element.getFirstChild() != null) {
            org.teavm.jso.dom.html.HTMLElement span = (org.teavm.jso.dom.html.HTMLElement) this.element.getFirstChild();
            span.setClassName(sb.toString());
        }
    }
}
