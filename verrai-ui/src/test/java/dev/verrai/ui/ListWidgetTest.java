package dev.verrai.ui;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.teavm.jso.dom.html.HTMLElement;
import dev.verrai.bootstrap.Widget;
import dev.verrai.api.IsWidget;
import javax.inject.Provider;
import java.util.Arrays;
import java.util.List;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class ListWidgetTest {

    @Mock
    HTMLElement mockListElement;

    @Mock
    HTMLElement mockItemElement;

    public static class TestItemWidget extends Widget implements HasModel<String> {
        private String model;

        @Override
        public void setModel(String model) {
            this.model = model;
        }

        @Override
        public String getModel() {
            return model;
        }
    }

    private class TestListWidget extends ListWidget<String, TestItemWidget> {
        public TestListWidget() {
            super("ul");
        }

        @Override
        protected HTMLElement createListElement(String tagName) {
            return mockListElement;
        }
    }

    @Test
    public void testOptimizedUpdate() {
        TestListWidget listWidget = new TestListWidget();
        Provider<TestItemWidget> provider = mock(Provider.class);
        listWidget.itemWidgetProvider = provider;

        // Setup provider to return widgets with mock elements
        when(provider.get()).thenAnswer(invocation -> {
            TestItemWidget w = spy(new TestItemWidget());
            w.element = mockItemElement;
            return w;
        });

        // Initial set
        List<String> items1 = Arrays.asList("A", "B", "C");
        listWidget.setValue(items1);

        // Verify initial creation
        verify(mockListElement, times(0)).setInnerText(anyString()); // Never cleared
        verify(mockListElement, times(3)).appendChild(any());
        verify(provider, times(3)).get();

        // Update with same items (different list instance)
        List<String> items2 = Arrays.asList("A", "B", "C");
        listWidget.setValue(items2);

        // Verify NO new creation or DOM manipulation for same size
        verify(mockListElement, times(0)).setInnerText(anyString());
        verify(mockListElement, times(3)).appendChild(any()); // Still 3 total
        verify(provider, times(3)).get(); // Still 3 total

        // Verify removing
        List<String> items3 = Arrays.asList("A");
        listWidget.setValue(items3);

        verify(mockListElement, times(2)).removeChild(any()); // Removed 2 items (B and C)
        verify(mockListElement, times(3)).appendChild(any()); // Still 3 total appends
    }
}
