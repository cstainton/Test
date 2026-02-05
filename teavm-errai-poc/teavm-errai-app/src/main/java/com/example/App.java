package com.example;

import com.example.errai.api.EntryPoint;
import com.example.errai.api.PostConstruct;
import javax.inject.Inject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLElement;

@EntryPoint
public class App {

    @Inject
    public MyComponent component;

    @PostConstruct
    public void onModuleLoad() {
        // The bootstrapper calls this.
        // We simply attach the component's element.
        // No manual binding or generated code visible here.
        if (component.element != null) {
            Window.current().getDocument().getBody().appendChild(component.element);
        } else {
            Window.alert("Error: Component element is null!");
        }
    }

    public static void main(String[] args) {
        new BootstrapperImpl().run();
    }
}
