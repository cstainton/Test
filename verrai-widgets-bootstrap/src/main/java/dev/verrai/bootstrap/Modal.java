package dev.verrai.bootstrap;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.html.HTMLElement;

public class Modal extends Widget {

    private HTMLElement dialog;
    private HTMLElement content;
    private HTMLElement header;
    private HTMLElement body;
    private HTMLElement footer;
    private HTMLElement title;

    public Modal(String titleText) {
        this.element = org.teavm.jso.browser.Window.current().getDocument().createElement("div");
        this.element.setClassName("modal fade");
        this.element.setAttribute("tabindex", "-1");

        dialog = org.teavm.jso.browser.Window.current().getDocument().createElement("div");
        dialog.setClassName("modal-dialog");
        this.element.appendChild(dialog);

        content = org.teavm.jso.browser.Window.current().getDocument().createElement("div");
        content.setClassName("modal-content");
        dialog.appendChild(content);

        header = org.teavm.jso.browser.Window.current().getDocument().createElement("div");
        header.setClassName("modal-header");
        content.appendChild(header);

        title = org.teavm.jso.browser.Window.current().getDocument().createElement("h5");
        title.setClassName("modal-title");
        title.setInnerText(titleText);
        header.appendChild(title);

        HTMLElement closeBtn = org.teavm.jso.browser.Window.current().getDocument().createElement("button");
        closeBtn.setClassName("btn-close");
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("data-bs-dismiss", "modal");
        closeBtn.setAttribute("aria-label", "Close");
        header.appendChild(closeBtn);

        body = org.teavm.jso.browser.Window.current().getDocument().createElement("div");
        body.setClassName("modal-body");
        content.appendChild(body);

        footer = org.teavm.jso.browser.Window.current().getDocument().createElement("div");
        footer.setClassName("modal-footer");
        content.appendChild(footer);
    }

    public void addBody(Widget w) {
        if (w.element != null) body.appendChild(w.element);
    }

    public void addFooter(Widget w) {
        if (w.element != null) footer.appendChild(w.element);
    }

    public void show() {
        BootstrapModalJSO.getOrCreateInstance(this.element).show();
    }

    public void hide() {
        BootstrapModalJSO.getOrCreateInstance(this.element).hide();
    }

    abstract static class BootstrapModalJSO implements JSObject {
        @JSBody(params = {"element"}, script = "return new bootstrap.Modal(element);")
        static native BootstrapModalJSO getOrCreateInstance(HTMLElement element);

        abstract void show();
        abstract void hide();
    }
}
