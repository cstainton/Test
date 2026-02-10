package uk.co.instanto.tearay.sample;

import uk.co.instanto.tearay.api.EntryPoint;
import uk.co.instanto.tearay.api.PostConstruct;
import uk.co.instanto.tearay.api.Navigation;
import javax.inject.Inject;

@EntryPoint
public class App {

    @Inject
    public Navigation navigation;

    @PostConstruct
    public void onModuleLoad() {
        navigation.goTo("login");
    }

    public static void main(String[] args) {
        new BootstrapperImpl().run();
    }
}
