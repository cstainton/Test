package uk.co.instanto.tearay.widgets;

import java.util.List;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.xml.DocumentFragment;

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

    public void addContents(List<Widget> widgets) {
        DocumentFragment fragment = Window.current().getDocument().createDocumentFragment();
        for (Widget widget : widgets) {
            if (widget.element != null) {
                fragment.appendChild(widget.element);
            }
        }
        body.appendChild(fragment);
    }

    public void addContents(Widget... widgets) {
        DocumentFragment fragment = Window.current().getDocument().createDocumentFragment();
        for (Widget widget : widgets) {
            if (widget.element != null) {
                fragment.appendChild(widget.element);
            }
        }
        body.appendChild(fragment);
    }
}
