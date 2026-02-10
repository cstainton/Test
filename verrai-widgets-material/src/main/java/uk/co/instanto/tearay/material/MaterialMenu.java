package uk.co.instanto.tearay.material;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.EventListener;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class MaterialMenu extends MaterialWidget {

    private HTMLElement list;
    private MDCMenu instance;

    public MaterialMenu() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("mdc-menu mdc-menu-surface");

        this.list = Window.current().getDocument().createElement("ul");
        this.list.setClassName("mdc-list");
        this.list.setAttribute("role", "menu");
        this.list.setAttribute("aria-hidden", "true");
        this.list.setAttribute("aria-orientation", "vertical");
        this.list.setAttribute("tabindex", "-1");

        this.element.appendChild(this.list);
    }

    public void addItem(String text, EventListener<?> listener) {
        HTMLElement item = Window.current().getDocument().createElement("li");
        item.setClassName("mdc-list-item");
        item.setAttribute("role", "menuitem");

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

        this.list.appendChild(item);
    }

    private void ensureInstance() {
        if (instance == null) {
            instance = MDCMenu.attachTo(this.element);
        }
    }

    public void setOpen(boolean open) {
        ensureInstance();
        if (instance != null) {
            instance.setOpen(open);
        }
    }

    public void setAnchor(HTMLElement anchor) {
        ensureInstance();
        if (instance != null) {
            instance.setAnchorElement(anchor);
        }
    }

    abstract static class MDCMenu implements JSObject {
        @JSBody(params = {"element"}, script = "if(typeof mdc !== 'undefined') return mdc.menu.MDCMenu.attachTo(element); return null;")
        static native MDCMenu attachTo(HTMLElement element);

        @org.teavm.jso.JSProperty
        abstract void setOpen(boolean open);

        @JSBody(params = {"element"}, script = "this.setAnchorElement(element);")
        abstract void setAnchorElement(HTMLElement element);
    }
}
