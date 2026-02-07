package uk.co.instanto.tearay.widgets;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLTextAreaElement;
import uk.co.instanto.tearay.api.TakesValue;

public class TextArea extends Widget implements TakesValue<String> {

    private HTMLTextAreaElement textArea;

    public TextArea() {
        this.element = Window.current().getDocument().createElement("textarea");
        this.textArea = (HTMLTextAreaElement) this.element;
        this.element.setClassName("form-control");
    }

    public void setRows(int rows) {
        this.textArea.setRows(rows);
    }

    public void setPlaceholder(String text) {
        this.textArea.setPlaceholder(text);
    }

    public void setReadOnly(boolean readOnly) {
        this.textArea.setReadOnly(readOnly);
    }

    public void setDisabled(boolean disabled) {
        this.textArea.setDisabled(disabled);
    }

    @Override
    public void setValue(String value) {
        this.textArea.setValue(value);
    }

    @Override
    public String getValue() {
        return this.textArea.getValue();
    }
}
