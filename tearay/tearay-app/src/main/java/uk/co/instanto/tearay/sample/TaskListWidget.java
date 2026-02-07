package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.ui.ListWidget;
import uk.co.instanto.tearay.ui.HasModel;
import uk.co.instanto.tearay.api.Templated;
import uk.co.instanto.tearay.api.Dependent;

// We need to extend ListWidget for CDI to inject the provider
@Dependent
public class TaskListWidget extends ListWidget<Task, TaskWidget> {
    public TaskListWidget() {
        super("div");
        getElement().setClassName("list-group");
    }
}
