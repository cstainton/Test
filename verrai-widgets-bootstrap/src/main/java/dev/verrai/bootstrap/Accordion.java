package dev.verrai.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLButtonElement;

public class Accordion extends Widget {

    private static int accordionCounter = 0;
    private final String accordionId;
    private int itemCounter = 0;

    public Accordion() {
        this.accordionId = "accordion-" + (++accordionCounter);
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("accordion");
        this.element.setAttribute("id", accordionId);
    }

    public void addItem(String title, Widget content) {
        String itemId = accordionId + "-item-" + (++itemCounter);
        String headerId = "heading-" + itemId;
        String collapseId = "collapse-" + itemId;

        HTMLElement itemDiv = Window.current().getDocument().createElement("div");
        itemDiv.setClassName("accordion-item");

        // Header
        HTMLElement header = Window.current().getDocument().createElement("h2");
        header.setClassName("accordion-header");
        header.setAttribute("id", headerId);

        HTMLButtonElement button = (HTMLButtonElement) Window.current().getDocument().createElement("button");
        button.setClassName("accordion-button collapsed");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-toggle", "collapse");
        button.setAttribute("data-bs-target", "#" + collapseId);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", collapseId);
        button.setInnerText(title);

        header.appendChild(button);
        itemDiv.appendChild(header);

        // Collapse Body
        HTMLElement collapseDiv = Window.current().getDocument().createElement("div");
        collapseDiv.setAttribute("id", collapseId);
        collapseDiv.setClassName("accordion-collapse collapse");
        collapseDiv.setAttribute("aria-labelledby", headerId);
        collapseDiv.setAttribute("data-bs-parent", "#" + accordionId);

        HTMLElement bodyDiv = Window.current().getDocument().createElement("div");
        bodyDiv.setClassName("accordion-body");

        if (content.element != null) {
            bodyDiv.appendChild(content.element);
        }

        collapseDiv.appendChild(bodyDiv);
        itemDiv.appendChild(collapseDiv);

        this.element.appendChild(itemDiv);
    }
}
