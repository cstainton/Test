package uk.co.instanto.tearay.material;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.EventListener;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class MaterialDrawer extends MaterialWidget {

    private HTMLElement content;
    private HTMLElement scrim;

    // JS instance
    private MDCDrawer drawerInstance;

    public MaterialDrawer() {
        this.element = Window.current().getDocument().createElement("aside");
        this.element.setClassName("mdc-drawer mdc-drawer--modal");

        HTMLElement header = Window.current().getDocument().createElement("div");
        header.setClassName("mdc-drawer__header");
        HTMLElement title = Window.current().getDocument().createElement("h3");
        title.setClassName("mdc-drawer__title");
        title.setInnerText("Drawer");
        header.appendChild(title);
        this.element.appendChild(header);

        this.content = Window.current().getDocument().createElement("div");
        this.content.setClassName("mdc-drawer__content");
        HTMLElement nav = Window.current().getDocument().createElement("nav");
        nav.setClassName("mdc-list");
        this.content.appendChild(nav);
        this.element.appendChild(this.content);

        // Scrim must be sibling of drawer
        this.scrim = Window.current().getDocument().createElement("div");
        this.scrim.setClassName("mdc-drawer-scrim");
    }

    // Public because it needs to be called after attaching to DOM
    public void initialize() {
        if (this.element.getParentNode() != null) {
            // Append scrim after drawer
            this.element.getParentNode().insertBefore(scrim, this.element.getNextSibling());
            this.drawerInstance = MDCDrawer.attachTo(this.element);
        }
    }

    public void open() {
        if (this.drawerInstance == null) initialize();
        if (this.drawerInstance != null) this.drawerInstance.setOpen(true);
    }

    public void close() {
        if (this.drawerInstance != null) this.drawerInstance.setOpen(false);
    }

    public void addItem(String text, EventListener<?> listener) {
        HTMLElement item = Window.current().getDocument().createElement("a");
        item.setClassName("mdc-list-item");
        item.setAttribute("href", "#");
        item.setAttribute("aria-current", "page");

        HTMLElement ripple = Window.current().getDocument().createElement("span");
        ripple.setClassName("mdc-list-item__ripple");
        item.appendChild(ripple);

        HTMLElement textSpan = Window.current().getDocument().createElement("span");
        textSpan.setClassName("mdc-list-item__text");
        textSpan.setInnerText(text);
        item.appendChild(textSpan);

        if (listener != null) {
            item.addEventListener("click", listener);
        }

        // Find the list (nav)
        HTMLElement list = (HTMLElement) this.content.querySelector(".mdc-list");
        list.appendChild(item);
    }

    public HTMLElement getScrim() {
        return scrim;
    }

    abstract static class MDCDrawer implements JSObject {
        @JSBody(params = {"element"}, script = "if(typeof mdc !== 'undefined') return mdc.drawer.MDCDrawer.attachTo(element); return null;")
        static native MDCDrawer attachTo(HTMLElement element);

        @org.teavm.jso.JSProperty
        abstract void setOpen(boolean open);
    }
}
