package com.example;

import com.example.errai.api.EntryPoint;
import com.example.errai.api.PostConstruct;
import com.example.errai.api.Navigation;
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
