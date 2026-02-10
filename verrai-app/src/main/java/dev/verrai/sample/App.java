package dev.verrai.sample;

import dev.verrai.api.EntryPoint;
import dev.verrai.api.PostConstruct;
import dev.verrai.api.Navigation;
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
