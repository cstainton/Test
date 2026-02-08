package uk.co.instanto.tearay.widgets;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;

public class Offcanvas extends Widget {
    private HTMLElement header;
    private HTMLElement body;
    private HTMLElement titleElement;

    public Offcanvas() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("offcanvas offcanvas-start");
        this.element.setAttribute("tabindex", "-1");
        String id = "offcanvas-" + (int)(Math.random() * 10000);
        this.element.setAttribute("id", id);
        this.element.setAttribute("aria-labelledby", id + "-label");

        this.header = Window.current().getDocument().createElement("div");
        this.header.setClassName("offcanvas-header");

        this.titleElement = Window.current().getDocument().createElement("h5");
        this.titleElement.setClassName("offcanvas-title");
        this.titleElement.setAttribute("id", id + "-label");
        this.header.appendChild(this.titleElement);

        HTMLElement closeBtn = Window.current().getDocument().createElement("button");
        closeBtn.setClassName("btn-close text-reset");
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("data-mdb-dismiss", "offcanvas"); // MDB specific
        closeBtn.setAttribute("aria-label", "Close");
        this.header.appendChild(closeBtn);

        this.element.appendChild(this.header);

        this.body = Window.current().getDocument().createElement("div");
        this.body.setClassName("offcanvas-body");
        this.element.appendChild(this.body);
    }

    public void setTitle(String title) {
        this.titleElement.setInnerText(title);
    }

    public void addBody(Widget w) {
        if (w.element != null) {
            this.body.appendChild(w.element);
        }
    }

    public void show() {
        MDBOffcanvasJSO.getOrCreateInstance(this.element).show();
    }

    public void hide() {
        MDBOffcanvasJSO.getOrCreateInstance(this.element).hide();
    }

    abstract static class MDBOffcanvasJSO implements JSObject {
        @JSBody(params = {"element"}, script = "return new mdb.Offcanvas(element);")
        static native MDBOffcanvasJSO getOrCreateInstance(HTMLElement element);

        abstract void show();
        abstract void hide();
    }
}
