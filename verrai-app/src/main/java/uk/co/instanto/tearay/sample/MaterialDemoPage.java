package uk.co.instanto.tearay.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.material.*;
import uk.co.instanto.tearay.api.*;
import javax.inject.Inject;

@Page(role = "material-demo")
@Templated
public class MaterialDemoPage {

    @Inject
    public Navigation navigation;

    @RootElement
    public HTMLElement element;

    @Inject @DataField
    public MaterialDrawer drawer;

    @Inject @DataField
    public MaterialTextField nameInput;

    @Inject @DataField
    public MaterialButton toggleButton;

    @Inject @DataField
    public MaterialFAB fab;

    @Inject @DataField
    public MaterialMenu menu;

    @PageShowing
    public void onShow() {
        // Drawer
        drawer.addItem("Inbox", e -> Window.alert("Inbox clicked"));
        drawer.addItem("Star", e -> Window.alert("Star clicked"));
        drawer.initialize();

        // Button
        toggleButton.setText("Open Drawer");
        toggleButton.addClickListener(e -> drawer.open());

        // FAB
        fab.addClickListener(e -> Window.alert("FAB Action!"));

        // Menu
        menu.addItem("Refresh", e -> Window.alert("Refreshing..."));
        menu.addItem("Settings", e -> Window.alert("Settings..."));
        // Anchor menu to FAB for demo
        menu.setAnchor(fab.getElement());

        // Input
        nameInput.setValue("TeaVM User");
    }
}
