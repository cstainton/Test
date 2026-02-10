package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.Page;
import uk.co.instanto.tearay.api.Templated;
import uk.co.instanto.tearay.api.DataField;
import uk.co.instanto.tearay.api.Navigation;
import uk.co.instanto.tearay.api.PageShowing;
import uk.co.instanto.tearay.api.PageState;
import uk.co.instanto.tearay.api.RestrictedAccess;
import uk.co.instanto.tearay.api.RootElement;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLButtonElement;
import javax.inject.Inject;

@Page(role = "user-profile")
@RestrictedAccess(roles = "admin")
@Templated
public class UserProfilePage {

    @Inject
    public Navigation navigation;

    @RootElement
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
