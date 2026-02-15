package dev.verrai.ui;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import dev.verrai.api.IsWidget;
import dev.verrai.api.TakesValue;
import dev.verrai.bootstrap.Widget;
import javax.inject.Inject;
import javax.inject.Provider;
import java.util.List;
import java.util.ArrayList;

public abstract class ListWidget<M, W extends IsWidget & HasModel<M>> extends Widget implements TakesValue<List<M>> {

    private final HTMLElement listElement;

    @Inject
    public Provider<W> itemWidgetProvider;

    private List<M> items = new ArrayList<>();
    private final List<W> activeWidgets = new ArrayList<>();

    public ListWidget() {
        this("ul");
    }

    public ListWidget(String tagName) {
        this.listElement = createListElement(tagName);
        this.element = this.listElement;
    }

    protected HTMLElement createListElement(String tagName) {
        return Window.current().getDocument().createElement(tagName);
    }

    @Override
    public void setValue(List<M> value) {
        this.items = value;
        List<M> listToRender = value != null ? value : new ArrayList<>();

        int index = 0;
        for (M item : listToRender) {
            W widget;
            if (index < activeWidgets.size()) {
                widget = activeWidgets.get(index);
            } else {
                widget = itemWidgetProvider.get();
                activeWidgets.add(widget);
                listElement.appendChild(widget.getElement());
            }
            widget.setModel(item);
            index++;
        }

        while (activeWidgets.size() > listToRender.size()) {
            W widget = activeWidgets.remove(activeWidgets.size() - 1);
            listElement.removeChild(widget.getElement());
        }
    }

    @Override
    public List<M> getValue() {
        return items;
    }
}
