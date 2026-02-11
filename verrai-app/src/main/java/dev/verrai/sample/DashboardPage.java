package dev.verrai.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import dev.verrai.bootstrap.*;
import dev.verrai.api.*;
import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Page(role = "dashboard")
@Templated
public class DashboardPage {

    @Inject
    public Navigation navigation;

    @Inject
    public GreetingService service;

    @Inject
    public uk.co.instanto.client.service.Caller<RemoteGreetingService> remoteService;

    @PageState
    public String username;

    @RootElement
    public HTMLElement element;

    @Inject @DataField
    public Container container;

    @Inject @DataField
    public TaskListWidget taskList;

    @Inject @DataField
    public TableWidget userTable;

    @Inject @DataField
    public Button qualifierBtn;

    @Inject @DataField
    public Button eventBtn;

    @Inject @DataField
    public Button compositeBtn;

    @EventHandler("qualifierBtn")
    public void onQualifierDemo() {
        navigation.goTo("qualifier");
    }

    @EventHandler("eventBtn")
    public void onEventDemo() {
        navigation.goTo("events");
    }

    @EventHandler("compositeBtn")
    public void onCompositeDemo() {
        navigation.goTo("composite");
    }

    @PageShowing
    public void onShow() {
        // Clear previous content if re-used
        container.element.setInnerText("");
        taskList.setValue(null); // Clear list
        userTable.clearBody();

        // Navbar
        Navbar navbar = new Navbar();
        navbar.setBrand("Tearay App");
        navbar.setSticky(true);
        navbar.addLink("Home", e -> Window.alert("Home clicked"));
        navbar.addLink("Profile", e -> {
            Map<String, String> params = new HashMap<>();
            params.put("userId", "12345");
            navigation.goTo("user-profile", params);
        });
        container.element.appendChild(navbar.element);

        Row row = new Row();
        container.element.appendChild(row.element);

        // Col 1: Card
        Column col1 = new Column().span(6);
        row.element.appendChild(col1.element);

        Card card = new Card();
        card.setTitle("Welcome " + (username != null ? username : "Guest"));
        card.setText(service.getGreeting());
        col1.element.appendChild(card.element);

        Button profileBtn = new Button();
        profileBtn.setText("Go to User Profile");
        profileBtn.setType(Button.Type.PRIMARY);
        profileBtn.addClickListener(e -> {
            Map<String, String> params = new HashMap<>();
            params.put("userId", "12345");
            params.put("name", "TeaVM User");
            navigation.goTo("user-profile", params);
        });
        card.addContent(profileBtn);

        // Radio Group
        RadioButton r1 = new RadioButton("options", "Option A");
        RadioButton r2 = new RadioButton("options", "Option B");
        r1.addChangeHandler(e -> Window.alert("Selected: Option A"));
        r2.addChangeHandler(e -> Window.alert("Selected: Option B"));
        col1.element.appendChild(r1.element);
        col1.element.appendChild(r2.element);

        // Col 2: Alert & Logout
        Column col2 = new Column().span(6);
        row.element.appendChild(col2.element);

        Alert alert = new Alert();
        alert.setType(Alert.Type.INFO);
        alert.setText("This is an info alert from the Widget library!");
        col2.element.appendChild(alert.element);

        Button logoutBtn = new Button();
        logoutBtn.setText("Logout");
        logoutBtn.setType(Button.Type.DANGER);
        logoutBtn.addClickListener(e -> navigation.goTo("login"));
        col2.element.appendChild(logoutBtn.element);

        Button remoteBtn = new Button();
        remoteBtn.setText("Call Remote Service");
        remoteBtn.setType(Button.Type.INFO);
        remoteBtn.addClickListener(e -> {
             remoteService.call(s -> s.getGreeting("Remote User")).thenAccept(result -> {
                Window.alert("Remote Greeting: " + result);
            });
        });
        col2.element.appendChild(remoteBtn.element);

        // Slider demo
        Slider slider = new Slider();
        slider.setMin(0);
        slider.setMax(100);
        slider.setValue(50);
        slider.addChangeHandler(e -> alert.setText("Slider value: " + slider.getValue()));
        col2.element.appendChild(slider.element);

        // Switch
        Switch toggle = new Switch("Enable Notifications");
        toggle.addChangeHandler(e -> alert.setText("Notifications: " + (toggle.isChecked() ? "ON" : "OFF")));
        col2.element.appendChild(toggle.element);

        // Checkbox
        Checkbox agree = new Checkbox("I agree to the terms");
        agree.addChangeHandler(e -> {
            if (agree.getValue()) {
                logoutBtn.setType(Button.Type.DANGER);
                logoutBtn.setText("Logout (Enabled)");
            } else {
                logoutBtn.setType(Button.Type.WARNING);
                logoutBtn.setText("Logout (Disabled)");
            }
        });
        col2.element.appendChild(agree.element);

        // Populate List Widget (Model Binding)
        java.util.List<Task> tasks = new java.util.ArrayList<>();
        tasks.add(new Task("Review Code PR #101", false));
        tasks.add(new Task("Update Documentation", true));
        tasks.add(new Task("Deploy to Staging", false));
        taskList.setValue(tasks);

        // Populate Table Widget
        userTable.setHeaders("ID", "Name", "Role", "Status");
        userTable.addRow("1", "Alice", "Admin", "Active");
        userTable.addRow("2", "Bob", "User", "Inactive");
        userTable.addRow("3", "Charlie", "Developer", "Active");
    }
}
