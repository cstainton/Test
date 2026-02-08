package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.Dependent;
import uk.co.instanto.tearay.api.Named;

@Dependent
@Named("Credit")
public class CreditCardService implements PaymentService {
    @Override
    public String pay(int amount) {
        return "Paid " + amount + " via Credit Card";
    }
}
