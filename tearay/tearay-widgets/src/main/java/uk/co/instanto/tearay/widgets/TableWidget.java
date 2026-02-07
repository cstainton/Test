package uk.co.instanto.tearay.widgets;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.xml.Element;
import java.util.List;
import java.util.ArrayList;

public class TableWidget extends Widget {

    private HTMLElement tableElement;
    private HTMLElement thead;
    private HTMLElement tbody;

    public TableWidget() {
        this.tableElement = Window.current().getDocument().createElement("table");
        this.tableElement.setClassName("table table-striped table-hover"); // Bootstrap table classes

        this.thead = Window.current().getDocument().createElement("thead");
        this.tableElement.appendChild(this.thead);

        this.tbody = Window.current().getDocument().createElement("tbody");
        this.tableElement.appendChild(this.tbody);

        this.element = this.tableElement;
    }

    public void setHeaders(String... headers) {
        thead.setInnerText(""); // Clear existing
        HTMLElement tr = Window.current().getDocument().createElement("tr");
        for (String header : headers) {
            HTMLElement th = Window.current().getDocument().createElement("th");
            th.setAttribute("scope", "col");
            th.setInnerText(header);
            tr.appendChild(th);
        }
        thead.appendChild(tr);
    }

    public void addRow(String... cells) {
        HTMLElement tr = Window.current().getDocument().createElement("tr");
        for (String cell : cells) {
            HTMLElement td = Window.current().getDocument().createElement("td");
            td.setInnerText(cell);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    public void addRow(Widget... widgets) {
        HTMLElement tr = Window.current().getDocument().createElement("tr");
        for (Widget w : widgets) {
            HTMLElement td = Window.current().getDocument().createElement("td");
            td.appendChild(w.element);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    public void clearBody() {
        tbody.setInnerText("");
    }
}
