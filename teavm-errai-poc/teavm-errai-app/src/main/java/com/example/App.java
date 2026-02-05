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
        // Manually attach the component to the DOM for this demonstration.
        // In a full implementation, the framework would handle attaching the root view.
        // Re-binding here to get the root element.
        HTMLElement root = MyComponent_Binder.bind(component);
        Window.current().getDocument().getBody().appendChild(root);

        // Demonstrate usage of the injected service
        component.submit.addEventListener("click", evt -> {
             component.output.setInnerHTML(component.helloService.getGreeting());
        });
    }

    public static void main(String[] args) {
        new BootstrapperImpl().run();
    }
}
