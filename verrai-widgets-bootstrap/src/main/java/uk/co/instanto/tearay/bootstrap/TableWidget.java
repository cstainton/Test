package uk.co.instanto.tearay.bootstrap;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class TableWidget extends Widget {

    private HTMLElement table;
    private HTMLElement thead;
    private HTMLElement tbody;

    public TableWidget() {
        this.element = Window.current().getDocument().createElement("table");
        this.table = this.element;
        this.table.setClassName("table table-striped table-hover");

        this.thead = Window.current().getDocument().createElement("thead");
        this.table.appendChild(this.thead);

        this.tbody = Window.current().getDocument().createElement("tbody");
        this.table.appendChild(this.tbody);
    }

    public void setHeaders(String... headers) {
        thead.setInnerText("");
        HTMLElement tr = Window.current().getDocument().createElement("tr");
        for (String h : headers) {
            HTMLElement th = Window.current().getDocument().createElement("th");
            th.setInnerText(h);
            tr.appendChild(th);
        }
        thead.appendChild(tr);
    }

    public void addRow(String... cells) {
        HTMLElement tr = Window.current().getDocument().createElement("tr");
        for (String c : cells) {
            HTMLElement td = Window.current().getDocument().createElement("td");
            td.setInnerText(c);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    public void clearBody() {
        tbody.setInnerText("");
    }
}
