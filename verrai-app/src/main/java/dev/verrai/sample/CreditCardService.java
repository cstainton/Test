package dev.verrai.sample;

import dev.verrai.api.Dependent;
import dev.verrai.api.Named;

@Dependent
@Named("Credit")
public class CreditCardService implements PaymentService {
    @Override
    public String pay(int amount) {
        return "Paid " + amount + " via Credit Card";
    }
}
