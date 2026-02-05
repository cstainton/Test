package com.example;

import com.example.errai.api.DataField;
import com.example.errai.api.Templated;
import com.example.errai.api.PostConstruct;
import org.teavm.jso.dom.html.HTMLButtonElement;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.browser.Window;
import javax.inject.Inject;

@Templated
public class MyComponent {

    @Inject
    public HelloService helloService;

    @DataField
    public HTMLButtonElement submit;

    @DataField
    public HTMLElement output;

    @PostConstruct
    public void init() {
         // The @Templated annotation ensures that fields annotated with @DataField
         // are bound to the corresponding DOM elements in the HTML template.
    }
}
