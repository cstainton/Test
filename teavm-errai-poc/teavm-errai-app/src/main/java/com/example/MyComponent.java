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

    // The 'element' field is populated by the generated binder with the root of the template
    public HTMLElement element;

    @DataField
    public HTMLButtonElement submit;

    @DataField
    public HTMLElement output;

    @PostConstruct
    public void init() {
         // Logic is now contained here.
         submit.addEventListener("click", evt -> {
             output.setInnerHTML(helloService.getGreeting());
         });
    }
}
