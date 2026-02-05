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

    public HTMLElement element;

    @DataField
    public HTMLButtonElement loginBtn;

    @PageShowing
    public void onShow() {
        loginBtn.addEventListener("click", e -> navigation.goTo("dashboard"));
    }
}
