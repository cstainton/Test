package com.example;

import com.example.errai.api.Page;
import com.example.errai.api.Templated;
import com.example.errai.api.DataField;
import com.example.errai.api.Navigation;
import com.example.errai.api.PageShowing;
import com.example.errai.api.PageState;
import com.example.errai.api.RestrictedAccess;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLButtonElement;
import javax.inject.Inject;

@Page(role = "user-profile")
@RestrictedAccess(roles = "admin")
@Templated
public class UserProfilePage {

    @Inject
    public Navigation navigation;

    public HTMLElement element;

    @PageState
    public String userId;

    @PageState
    public String name;

    @DataField
    public HTMLElement idSpan;

    @DataField
    public HTMLElement nameSpan;

    @DataField
    public HTMLButtonElement backBtn;

    @PageShowing
    public void onShow() {
        idSpan.setInnerText(userId != null ? userId : "N/A");
        nameSpan.setInnerText(name != null ? name : "N/A");

        backBtn.addEventListener("click", e -> navigation.goTo("dashboard"));
    }
}
