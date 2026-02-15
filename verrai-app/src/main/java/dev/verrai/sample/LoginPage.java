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
import dev.verrai.rpc.teavm.WebWorkerTransport;
import uk.co.instanto.client.service.dto.LogonRequest;

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

    private org.teavm.jso.workers.Worker worker;
    private HTMLElement debugOverlay;

    @PageShowing
    public void onShow() {
        initWorker();

        loginBtn.addEventListener("click", e -> {
            securityProvider.setRoles("user");

            LogonRequest req = new LogonRequest("RegularUser", "secret");

            AuthenticationService authService = UnitRegistry.getInstance().getService(AuthenticationService.class);
            if (authService != null) {
                authService.login(req).thenAccept(response -> {
                    // Configure RPC with JWT from response
                    String jwt = response.getJwtToken();

                    try {
                        // For now, assume backend isn't there, but we got token from worker
                        UnitRegistry.getInstance().setDefaultHeader("Authorization", "Bearer " + jwt);

                        // Navigate
                        Map<String, String> params = new HashMap<>();
                        params.put("username", req.getUsername());
                        navigation.goTo("dashboard", params);
                    } catch (Exception ex) {
                        System.out.println("Configuration failed: " + ex.getMessage());
                    }
                }).exceptionally(err -> {
                     Window.alert("Login Failed: " + err.getMessage());
                     return null;
                });
            } else {
                Window.alert("Authentication Service not available");
            }
        });

        adminLoginBtn.addEventListener("click", e -> {
            securityProvider.setRoles("admin");
            Map<String, String> params = new HashMap<>();
            params.put("username", "Administrator");
            navigation.goTo("dashboard", params);
        });
    }

    private void initWorker() {
        if (worker != null) return;

        worker = createWorker("verrai/worker.js");
        WebWorkerTransport transport = new WebWorkerTransport(worker);

        // Debug Overlay
        if (debugOverlay == null) {
            debugOverlay = Window.current().getDocument().createElement("div").cast();
            debugOverlay.setAttribute("style", "position: fixed; bottom: 0; right: 0; width: 300px; height: 200px; background: rgba(0,0,0,0.8); color: lime; font-family: monospace; overflow-y: scroll; padding: 5px; z-index: 9999; pointer-events: none; font-size: 10px;");
            Window.current().getDocument().getBody().appendChild(debugOverlay);
        }

        DebugTransport debugTransport = new DebugTransport(transport, msg -> {
            HTMLElement line = Window.current().getDocument().createElement("div");
            line.setInnerText(msg);
            debugOverlay.appendChild(line);
            debugOverlay.setScrollTop(debugOverlay.getScrollHeight());
        });

        // Register remote service
        UnitRegistry.getInstance().registerRemote(AuthenticationService.class.getName(), "auth-worker", debugTransport);

        // Register Factory manually as it might not be picked up by Bootstrapper for interfaces in the same module
        UnitRegistry.getInstance().registerFactory(AuthenticationService.class, new AuthenticationService_Factory());
    }

    @org.teavm.jso.JSBody(params = "url", script = "return new Worker(url);")
    private static native org.teavm.jso.workers.Worker createWorker(String url);
}
