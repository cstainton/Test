package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;

public class Toast extends Widget {

    private HTMLElement header;
    private HTMLElement body;
    private HTMLElement title;
    private HTMLElement time;

    public Toast() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("toast");
        this.element.setAttribute("role", "alert");
        this.element.setAttribute("aria-live", "assertive");
        this.element.setAttribute("aria-atomic", "true");

        // Header
        header = Window.current().getDocument().createElement("div");
        header.setClassName("toast-header");

        // Icon/Image could be added here

        title = Window.current().getDocument().createElement("strong");
        title.setClassName("me-auto");
        header.appendChild(title);

        time = Window.current().getDocument().createElement("small");
        header.appendChild(time);

        HTMLElement closeBtn = Window.current().getDocument().createElement("button");
        closeBtn.setClassName("btn-close");
        closeBtn.setAttribute("data-bs-dismiss", "toast");
        closeBtn.setAttribute("aria-label", "Close");
        header.appendChild(closeBtn);

        this.element.appendChild(header);

        // Body
        body = Window.current().getDocument().createElement("div");
        body.setClassName("toast-body");
        this.element.appendChild(body);
    }

    public void setHeader(String titleText, String timeText) {
        title.setInnerText(titleText);
        time.setInnerText(timeText);
    }

    public void setBody(String content) {
        body.setInnerText(content);
    }

    public void setBody(Widget widget) {
        body.setInnerText(""); // clear
        body.appendChild(widget.element);
    }

    public void show() {
        BootstrapToastJSO.getOrCreateInstance(this.element).show();
    }

    public void hide() {
        BootstrapToastJSO.getOrCreateInstance(this.element).hide();
    }

    abstract static class BootstrapToastJSO implements JSObject {
        @JSBody(params = {"element"}, script = "return new bootstrap.Toast(element);")
        static native BootstrapToastJSO getOrCreateInstance(HTMLElement element);

        abstract void show();
        abstract void hide();
    }
}
