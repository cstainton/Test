package uk.co.instanto.tearay.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.bootstrap.*;
import uk.co.instanto.tearay.api.*;
import uk.co.instanto.tearay.api.validation.*;
import javax.inject.Inject;
import java.util.Set;

@Page(role = "validation")
@Templated
public class ValidationDemoPage {

    @Inject
    public Navigation navigation;

    @RootElement
    public HTMLElement element;

    @Inject @DataField @Bound
    public TextBox username;

    @Inject @DataField @Bound
    public TextBox email;

    // We don't have integer binding yet, so using TextBox and parsing manually for demo simplicity or use Slider which is TakesValue<Integer>
    @Inject @DataField @Bound
    public Slider age;

    @Inject @DataField
    public Button submitBtn;

    @Inject @DataField
    public Button backBtn;

    @Inject @Model
    public UserForm form;

    @EventHandler("submitBtn")
    public void onSubmit() {
        // Validation (Manual Trigger using generated Validator)
        UserForm_Validator validator = new UserForm_Validator();
        Set<ConstraintViolation> violations = validator.validate(form);

        if (violations.isEmpty()) {
            Window.alert("Form Valid! Submitting: " + form.getUsername());
        } else {
            StringBuilder sb = new StringBuilder("Validation Errors:\n");
            for (ConstraintViolation v : violations) {
                sb.append("- ").append(v.getPropertyPath()).append(": ").append(v.getMessage()).append("\n");
            }
            Window.alert(sb.toString());
        }
    }

    @EventHandler("backBtn")
    public void onBack() {
        navigation.goTo("dashboard");
    }
}
