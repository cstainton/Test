package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.Page;
import uk.co.instanto.tearay.api.Templated;
import uk.co.instanto.tearay.api.DataField;
import uk.co.instanto.tearay.api.Navigation;
import uk.co.instanto.tearay.api.PageShowing;
import uk.co.instanto.tearay.api.RootElement;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLButtonElement;
import org.teavm.jso.browser.Window;
import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Page(role = "login")
@Templated
public class LoginPage {

    @Inject
    public Navigation navigation;

    @Inject
    public AppSecurityProvider securityProvider;

    @RootElement
    public HTMLElement element;

    @DataField
    public HTMLButtonElement loginBtn;

    @DataField
    public HTMLButtonElement adminLoginBtn;

    @PageShowing
    public void onShow() {
        loginBtn.addEventListener("click", e -> {
            securityProvider.setRoles("user");
            Map<String, String> params = new HashMap<>();
            params.put("username", "RegularUser");
            navigation.goTo("dashboard", params);
        });

        adminLoginBtn.addEventListener("click", e -> {
            securityProvider.setRoles("admin");
            Map<String, String> params = new HashMap<>();
            params.put("username", "Administrator");
            navigation.goTo("dashboard", params);
        });
    }
}
