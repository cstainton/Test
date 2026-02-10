package dev.verrai.ui;

import dev.verrai.api.IsWidget;
import dev.verrai.api.binding.BinderLifecycle;
import dev.verrai.api.binding.Subscription;
import org.teavm.jso.dom.html.HTMLElement;
import java.util.ArrayList;
import java.util.List;

public class Composite implements IsWidget, BinderLifecycle {

    public HTMLElement element;
    private final List<Subscription> subscriptions = new ArrayList<>();

    @Override
    public HTMLElement getElement() {
        return element;
    }

    protected void initWidget(IsWidget widget) {
        this.element = widget.getElement();
    }

    protected void initWidget(HTMLElement element) {
        this.element = element;
    }

    @Override
    public void addBinding(Subscription subscription) {
        subscriptions.add(subscription);
    }

    @Override
    public void clearBindings() {
        for (Subscription subscription : subscriptions) {
            subscription.remove();
        }
        subscriptions.clear();
    }
}
