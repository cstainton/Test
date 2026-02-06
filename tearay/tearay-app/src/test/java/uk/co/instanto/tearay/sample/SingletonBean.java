package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.cdi.ApplicationScoped;

@ApplicationScoped
public class SingletonBean {
    public int counter = 0;
}
