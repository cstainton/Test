package com.example;

import com.example.errai.api.Page;
import com.example.errai.api.Templated;
import com.example.errai.api.DataField;
import com.example.errai.api.Navigation;
import com.example.errai.api.PageShowing;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLButtonElement;
import org.teavm.jso.browser.Window;
import javax.inject.Inject;

@Page(role = "login")
@Templated
public class LoginPage {

    @Inject
    public Navigation navigation;

    @Inject
    public AppSecurityProvider securityProvider;

    public HTMLElement element;

    @DataField
    public HTMLButtonElement loginBtn;

    @DataField
    public HTMLButtonElement adminLoginBtn;

    @PageShowing
    public void onShow() {
        loginBtn.addEventListener("click", e -> {
            securityProvider.setRoles("user");
            navigation.goTo("dashboard");
        });

        adminLoginBtn.addEventListener("click", e -> {
            securityProvider.setRoles("admin");
            navigation.goTo("dashboard");
        });
    }
}
