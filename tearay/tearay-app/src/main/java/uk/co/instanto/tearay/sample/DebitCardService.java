package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.Dependent;
import uk.co.instanto.tearay.api.Named;

@Dependent
@Named("Debit")
public class DebitCardService implements PaymentService {
    @Override
    public String pay(int amount) {
        return "Paid " + amount + " via Debit Card";
    }
}
