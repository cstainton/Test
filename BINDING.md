# Data Binding in Verrai

Verrai provides a robust data binding mechanism inspired by Errai UI, allowing you to synchronize your UI components (Widgets) with your data models automatically.

## Quick Start

### 1. The Model (`@Bindable`)
Annotate your model class with `@Bindable`. This tells the Verrai processor to generate a proxy that intercepts property changes.

```java
import dev.verrai.api.Bindable;

@Bindable
public class User {
    private String name;
    private String email;

    // Standard getters and setters are required
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    // ...
}
```

### 2. The View (`@Templated`)
Inject the model into your component using `@Inject @Model`. Bind UI fields to model properties using `@Bound`.

```java
@Templated
public class UserPage extends Composite {

    @Inject @Model
    private User user;

    @Inject @DataField @Bound
    private TextBox name; // Binds to user.name by default

    @Inject @DataField @Bound(property = "email")
    private TextBox emailInput;
}
```

## How It Works

1.  **Proxy Generation**: The `BindableProcessor` generates a proxy for your `@Bindable` model (e.g., `User_BindableProxy`). This proxy overrides setter methods to fire property change events.
2.  **Two-Way Sync**:
    *   **View -> Model**: When the user types in the `TextBox`, the value is automatically updated in the `User` model.
    *   **Model -> View**: When you call `user.setName("Alice")` programmatically, the `TextBox` is automatically updated to show "Alice".

## Lifecycle Management & Memory Leaks

A common issue in Single Page Applications (SPAs) is memory leaks caused by long-lived models (e.g., `@ApplicationScoped`) holding references to transient views (e.g., a Page).

Verrai solves this automatically:

1.  **BinderLifecycle**: Components that extend `Composite` automatically implement `BinderLifecycle`.
2.  **Subscription Tracking**: When a binding is established, the subscription is added to the component's internal list.
3.  **Automatic Cleanup**: When you navigate away from a page using the `Navigation` system, Verrai automatically calls `clearBindings()` on the current page. This removes all listeners from the model, allowing the page to be garbage collected.

## Best Practices

*   Always extend `Composite` for your `@Templated` components to get automatic binding cleanup.
*   Use `@ApplicationScoped` for global state (like a `UserSession`) and bind it directly to your views. The lifecycle management will ensure no leaks occur.
*   Ensure your model has valid getters and setters for all bound properties.
