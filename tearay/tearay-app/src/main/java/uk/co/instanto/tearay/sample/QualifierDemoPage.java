package uk.co.instanto.tearay.sample;

import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import uk.co.instanto.tearay.bootstrap.*;
import uk.co.instanto.tearay.api.*;
import javax.inject.Inject;

@Page(role = "qualifier")
@Templated
public class QualifierDemoPage {

    @Inject
    public Navigation navigation;

    @RootElement
    public HTMLElement element;

    @Inject
    @Named("Credit")
    public PaymentService creditService;

    @Inject
    @Named("Debit")
    public PaymentService debitService;

    @Inject @DataField
    public Button testCredit;

    @Inject @DataField
    public Button testDebit;

    @Inject @DataField
    public Button backBtn;

    @EventHandler("testCredit")
    public void onTestCredit() {
        Window.alert(creditService.pay(100));
    }

    @EventHandler("testDebit")
    public void onTestDebit() {
        Window.alert(debitService.pay(50));
    }

    @EventHandler("backBtn")
    public void onBack() {
        navigation.goTo("dashboard");
    }
}
