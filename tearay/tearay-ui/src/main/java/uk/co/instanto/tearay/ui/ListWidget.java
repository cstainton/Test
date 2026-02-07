package uk.co.instanto.tearay.ui;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.api.IsWidget;
import uk.co.instanto.tearay.api.TakesValue;
import uk.co.instanto.tearay.widgets.Widget;
import javax.inject.Inject;
import javax.inject.Provider;
import java.util.List;
import java.util.ArrayList;

public abstract class ListWidget<M, W extends IsWidget & HasModel<M>> extends Widget implements TakesValue<List<M>> {

    private final HTMLElement listElement;

    @Inject
    public Provider<W> itemWidgetProvider;

    private List<M> items = new ArrayList<>();

    public ListWidget() {
        this("ul");
    }

    public ListWidget(String tagName) {
        this.listElement = Window.current().getDocument().createElement(tagName);
        this.element = this.listElement;
    }

    @Override
    public void setValue(List<M> value) {
        this.items = value;
        listElement.setInnerText(""); // Clear DOM
        if (value != null) {
            for (M item : value) {
                W widget = itemWidgetProvider.get();
                widget.setModel(item);
                listElement.appendChild(widget.getElement());
            }
        }
    }

    @Override
    public List<M> getValue() {
        return items;
    }
}
