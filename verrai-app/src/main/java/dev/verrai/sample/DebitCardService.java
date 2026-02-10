package dev.verrai.sample;

import dev.verrai.api.Dependent;
import dev.verrai.api.Named;

@Dependent
@Named("Debit")
public class DebitCardService implements PaymentService {
    @Override
    public String pay(int amount) {
        return "Paid " + amount + " via Debit Card";
    }
}
