package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.Templated;
import org.teavm.jso.dom.html.HTMLElement;
import javax.inject.Inject;

@Templated
public class BootstrapButton {

    // The processor injects the <button> element here from the template
    public HTMLElement element;

    public void setText(String text) {
        element.setInnerText(text);
    }

    public void addStyle(String style) {
        String current = element.getClassName();
        element.setClassName(current + " " + style);
    }

    public void addClickListener(org.teavm.jso.dom.events.EventListener<?> listener) {
        element.addEventListener("click", listener);
    }
}
