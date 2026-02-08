package uk.co.instanto.tearay.api;

import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.events.Event;

import java.util.function.BiConsumer;
import java.util.function.Function;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class DataBinderTest {

    static class TestModel {
        private String name;
        private Integer age;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Integer getAge() { return age; }
        public void setAge(Integer age) { this.age = age; }
    }

    interface MockWidget extends TakesValue<String>, IsWidget {}

    @Test
    public void testBindingAndUpdate() {
        DataBinder<TestModel> binder = new DataBinder<>();
        TestModel model = new TestModel();
        model.setName("Alice");

        MockWidget widget = mock(MockWidget.class);
        HTMLElement element = mock(HTMLElement.class);
        when(widget.getElement()).thenReturn(element);

        binder.setModel(model);
        binder.bind(widget, TestModel::getName, TestModel::setName, String.class, String.class);

        // Initial set
        verify(widget).setValue("Alice");

        // Verify event listener attached
        verify(element).addEventListener(eq("change"), any(EventListener.class));
    }

    @Test
    public void testModelUpdateFromWidget() {
        DataBinder<TestModel> binder = new DataBinder<>();
        TestModel model = new TestModel();

        MockWidget widget = mock(MockWidget.class);
        HTMLElement element = mock(HTMLElement.class);
        when(widget.getElement()).thenReturn(element);

        binder.setModel(model);
        binder.bind(widget, TestModel::getName, TestModel::setName, String.class, String.class);

        // Capture event listener
        ArgumentCaptor<EventListener> captor = ArgumentCaptor.forClass(EventListener.class);
        verify(element).addEventListener(eq("change"), captor.capture());

        // Simulate widget change
        when(widget.getValue()).thenReturn("Bob");
        captor.getValue().handleEvent(mock(Event.class));

        assertEquals("Bob", model.getName());
    }

    @Test
    public void testWidgetUpdateFromModel() {
        DataBinder<TestModel> binder = new DataBinder<>();
        TestModel model = new TestModel();
        model.setAge(20);

        TakesValue<String> widget = mock(TakesValue.class);
        // Not IsWidget, so no event listener attached (DataBinder checks instanceof)

        binder.setModel(model);
        // Using explicit converter logic indirectly via types
        // Model: Integer, Widget: String
        binder.bind(widget, TestModel::getAge, TestModel::setAge, Integer.class, String.class);

        verify(widget).setValue("20");

        // Update model and trigger update
        model.setAge(30);
        binder.setModel(model); // Re-set model triggers update

        verify(widget).setValue("30");
    }
}
