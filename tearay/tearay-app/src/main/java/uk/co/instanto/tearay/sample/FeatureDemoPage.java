package uk.co.instanto.tearay.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.events.Event;
import uk.co.instanto.tearay.bootstrap.*;
import uk.co.instanto.tearay.api.*;
import javax.inject.Inject;

@Page(role = "features")
@Templated
public class FeatureDemoPage {

    @Inject
    public Navigation navigation;

    @RootElement
    public HTMLElement element;

    @Inject @DataField
    public Button clickMeBtn;

    @Inject @DataField
    public Button backBtn;

    @EventHandler("clickMeBtn")
    public void onClick() {
        Window.alert("Clicked via @EventHandler!");
    }

    @EventHandler("backBtn")
    public void onBack() {
        navigation.goTo("dashboard");
    }

    @PageShown
    public void onShown() {
        Window.alert("Feature Page Shown! (DOM attached)");
    }

    @PageHiding
    public void onHiding() {
        Window.alert("Feature Page Hiding! (About to detach)");
    }
}
