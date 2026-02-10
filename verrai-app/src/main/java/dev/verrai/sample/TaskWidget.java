package dev.verrai.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import dev.verrai.bootstrap.Widget;
import dev.verrai.ui.HasModel;
import dev.verrai.api.Dependent;

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
