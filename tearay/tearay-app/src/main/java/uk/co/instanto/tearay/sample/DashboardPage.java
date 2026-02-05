package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.Page;
import uk.co.instanto.tearay.api.Templated;
import uk.co.instanto.tearay.api.DataField;
import uk.co.instanto.tearay.api.Navigation;
import uk.co.instanto.tearay.api.PageShowing;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLButtonElement;
import org.teavm.jso.browser.Window;
import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Page(role = "dashboard")
@Templated
public class DashboardPage {

    @Inject
    public Navigation navigation;

    @Inject
    public HelloService service;

    public HTMLElement element;

    @Inject @DataField
    public BootstrapButton backBtn;

    @Inject @DataField
    public BootstrapButton userBtn;

    @DataField
    public HTMLElement content;

    @PageShowing
    public void onShow() {
        content.setInnerHTML("Welcome! " + service.getGreeting());

        backBtn.setText("Logout (Bootstrap)");
        backBtn.addStyle("btn-danger");
        backBtn.addClickListener(e -> navigation.goTo("login"));

        userBtn.setText("Go to User Profile (Bootstrap)");
        userBtn.addStyle("btn-success");
        userBtn.addClickListener(e -> {
            Map<String, String> params = new HashMap<>();
            params.put("userId", "12345");
            params.put("name", "TeaVM User");
            navigation.goTo("user-profile", params);
        });
    }
}
