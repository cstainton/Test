package dev.verrai.sample;

import dev.verrai.api.Page;
import dev.verrai.api.Templated;
import dev.verrai.api.DataField;
import dev.verrai.api.Navigation;
import dev.verrai.api.PageShowing;
import dev.verrai.api.RootElement;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLButtonElement;
import org.teavm.jso.browser.Window;
import uk.co.instanto.client.service.UnitRegistry;
import uk.co.instanto.client.service.transport.TeaVMStompClientAdapter;
import uk.co.instanto.teavm.stomp.StompClient;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Page(role = "login")
@Templated
public class LoginPage {

    @Inject
    public Navigation navigation;

    @Inject
    public AppSecurityProvider securityProvider;

    @RootElement
    public HTMLElement element;

    @DataField
    public HTMLButtonElement loginBtn;

    @DataField
    public HTMLButtonElement adminLoginBtn;

    @PageShowing
    public void onShow() {
        loginBtn.addEventListener("click", e -> {
            securityProvider.setRoles("user");

            // Simulate Authentication and obtain JWT
            String jwt = "mock-jwt-token-123";

            // Configure RPC with JWT
            // Note: In a real app, this URL would come from config
            String wsUrl = "ws://localhost:8080/ws";
            try {
                StompClient jsoClient = StompClient.client(wsUrl);
                TeaVMStompClientAdapter adapter = new TeaVMStompClientAdapter(jsoClient);

                UnitRegistry.getInstance().configureStomp("client-node-" + System.currentTimeMillis(), adapter);
                UnitRegistry.getInstance().setDefaultHeader("Authorization", "Bearer " + jwt);

                // Example of requesting a service dynamically
                // This demonstrates that we can delay service connection until after auth
                UnitRegistry.getInstance().awaitService(RemoteGreetingService.class, service -> {
                    service.getGreeting("Verrai User").thenAccept(greeting -> {
                        Window.alert("Greeting from remote service: " + greeting);
                    }).exceptionally(ex -> {
                        // Expected failure in demo without backend
                        System.out.println("Service call failed as expected: " + ex.getMessage());
                        return null;
                    });
                });
            } catch (Exception ex) {
                System.out.println("RPC Configuration failed: " + ex.getMessage());
            }

            Map<String, String> params = new HashMap<>();
            params.put("username", "RegularUser");
            navigation.goTo("dashboard", params);
        });

        adminLoginBtn.addEventListener("click", e -> {
            securityProvider.setRoles("admin");
            Map<String, String> params = new HashMap<>();
            params.put("username", "Administrator");
            navigation.goTo("dashboard", params);
        });
    }
}
