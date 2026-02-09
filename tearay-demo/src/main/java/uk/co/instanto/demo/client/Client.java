package uk.co.instanto.demo.client;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;

public class Client {
    public static void main(String[] args) {
        HTMLDocument document = Window.current().getDocument();
        HTMLElement element = document.createElement("div");
        element.appendChild(document.createTextNode("TeaVM Demo Client Started"));
        document.getBody().appendChild(element);

        System.out.println("TeaVM Client initialized");
    }
}
