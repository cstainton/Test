package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;

public class Card extends Widget {

    private HTMLElement body;
    private HTMLElement title;
    private HTMLElement text;

    public Card() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("card");

        body = Window.current().getDocument().createElement("div");
        body.setClassName("card-body");
        this.element.appendChild(body);

        title = Window.current().getDocument().createElement("h5");
        title.setClassName("card-title");
        body.appendChild(title);

        text = Window.current().getDocument().createElement("p");
        text.setClassName("card-text");
        body.appendChild(text);
    }

    public void setTitle(String titleStr) {
        title.setInnerText(titleStr);
    }

    public void setText(String textStr) {
        text.setInnerText(textStr);
    }

    public void addContent(Widget widget) {
        if (widget.element != null) {
            body.appendChild(widget.element);
        }
    }
}
