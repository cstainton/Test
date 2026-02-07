package uk.co.instanto.tearay.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.widgets.Widget;
import uk.co.instanto.tearay.ui.HasModel;
import uk.co.instanto.tearay.api.Dependent;

@Dependent
public class TaskWidget extends Widget implements HasModel<Task> {

    private Task model;

    public TaskWidget() {
        this.element = Window.current().getDocument().createElement("div");
        this.element.setClassName("list-group-item");
    }

    @Override
    public void setModel(Task model) {
        this.model = model;
        this.element.setInnerText((model.isCompleted() ? "[DONE] " : "[TODO] ") + model.getTitle());
    }

    @Override
    public Task getModel() {
        return model;
    }
}
