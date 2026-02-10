package uk.co.instanto.tearay.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.bootstrap.*;
import uk.co.instanto.tearay.api.*;
import javax.inject.Inject;

@Page(role = "events")
@Templated
public class EventDemoPage {

    @Inject
    public Navigation navigation;

    @RootElement
    public HTMLElement element;

    @Inject @DataField
    public Button fireEventBtn;

    @Inject @DataField
    public Button backBtn;

    @Inject
    public Event<String> messageEvent;

    @EventHandler("fireEventBtn")
    public void onFire() {
        messageEvent.fire("Hello from EventBus!");
    }

    @EventHandler("backBtn")
    public void onBack() {
        navigation.goTo("dashboard");
    }

    public void onMessage(@Observes String message) {
        Window.alert("Received event: " + message);
    }
}
