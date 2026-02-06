package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.ApplicationScoped;
import uk.co.instanto.tearay.api.Event;
import uk.co.instanto.tearay.api.Observes;

import javax.inject.Inject;

@ApplicationScoped
public class CDITestBean {

    @Inject
    public Event<String> stringEvent;

    public String observedValue;

    public void onStringEvent(@Observes String event) {
        this.observedValue = event;
    }
}
