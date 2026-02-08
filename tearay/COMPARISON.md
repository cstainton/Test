# Comparison: Tearay vs Errai UI

This document compares the current state of the **Tearay** framework with **Errai UI** (latest version), focusing on feature parity, missing components, and architectural differences.

## 1. Templating & Component Model

| Feature | Errai UI | Tearay (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Declarative Templates** | `@Templated("file.html")` | `@Templated("file.html")` | ✅ Parity |
| **Field Binding** | `@DataField` binds elements/widgets | `@DataField` binds elements/widgets | ✅ Parity |
| **Element Replacement** | Replaces placeholder with Widget root | Replaces placeholder with `widget.element` | ✅ Parity |
| **Attribute Merging** | Merges `class`, `style`, `id` from template | Merges `class`, `style`, `id` (implemented in `TemplatedProcessor`) | ✅ Parity |
| **Nested Components** | `@Inject @DataField MyComponent c;` auto-instantiated | `@Inject @DataField MyComponent c;` manual instantiation required often | ⚠️ Partial |
| **Event Handling** | `@EventHandler("field")` for UI events | `@EventHandler("field")` for UI events | ✅ Parity |
| **Native Event Sinks** | `@SinkNative` | **Missing** | ❌ Missing |
| **Shadow DOM** | Supported | Not Supported | ⚪ Low Priority |

### Advice:
*   **Enhancement**: Improve nested component handling to ensure child components are properly instantiated and their lifecycle managed by the container.

## 2. Data Binding

| Feature | Errai Data Binding | Tearay (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Declarative Binding** | `@Bound` on fields | `@Bound` on fields | ✅ Parity |
| **Model Injection** | `@Inject @Model MyModel m;` | `@Inject @Model MyModel m;` | ✅ Parity |
| **Property Chains** | `@Bound(property="user.address.city")` | Supported via recursive getter generation | ✅ Parity |
| **Two-Way Sync** | Automatic (Model <-> Widget) | Automatic (Model <-> Widget) | ✅ Parity |
| **Converters** | Register generic/specific converters | **Missing** (Assumes type match) | ⚠️ Partial |
| **Validation** | JSR-303 integration | `@Validatable` annotation processor | ✅ Parity (Basic) |
| **Programmatic Binding** | `DataBinder<T>` API | **Missing** | ❌ Missing |

### Advice:
*   **Validation**: Implemented basic annotation-based validation (`@NotNull`, `@Size`, `@Min`, `@Max`, `@Pattern`).
*   **Converters**: Necessary for real-world apps (e.g., binding a `Date` object to a `TextInput`).

## 3. Navigation

| Feature | Errai Navigation | Tearay (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Page Definition** | `@Page(role = "home")` | `@Page(role = "home")` | ✅ Parity |
| **Lifecycle: Showing** | `@PageShowing` | `@PageShowing` | ✅ Parity |
| **Lifecycle: Shown** | `@PageShown` (DOM attached) | `@PageShown` (DOM attached) | ✅ Parity |
| **Lifecycle: Hiding** | `@PageHiding` (Before remove) | `@PageHiding` (Before remove) | ✅ Parity |
| **Lifecycle: Hidden** | `@PageHidden` (After remove) | `@PageHidden` | ✅ Parity |
| **State Management** | `@PageState` field injection | `@PageState` field injection | ✅ Parity |
| **Access Control** | `@RestrictedAccess` integration | `@RestrictedAccess` integration | ✅ Parity |

### Advice:
*   **Enhancement**: Consider implementing "Navigation Interceptors" or "Guards" for more complex access control scenarios beyond simple role checks.

## 4. IOC & CDI Features

| Feature | Errai IOC | Tearay (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Scopes** | `ApplicationScoped`, `Dependent`, `Singleton` | `ApplicationScoped`, `Dependent` | ✅ Parity |
| **Injection** | Field, Constructor, Setter | Field Injection only (mostly) | ⚠️ Partial |
| **Producers** | `@Produces` methods/fields | **Missing** | ❌ Missing |
| **Events** | `Event<T>`, `@Observes` | `@Observes` supported | ⚠️ Partial (In Progress) |
| **Qualifiers** | `@Named`, custom qualifiers | `@Named` supported | ⚠️ Partial (In Progress) |
| **Proxying** | Client-side proxies for circular deps | **Missing** (Simple factory chains) | ⚠️ Partial |

### Advice:
*   **Events**: Implement a simple `EventBus` and `@Observes` processor. This decouples components significantly.
*   **Qualifiers**: Needed for larger apps to distinguish beans of same type.

## 5. Other Ecosystem Features

| Feature | Errai | Tearay | Status |
| :--- | :--- | :--- | :--- |
| **I18n** | `@Bundle`, TranslationService | **Missing** | ❌ Missing |
| **RPC / Bus** | Errai Bus (Client-Server) | **Missing** (Use generic REST/JSON) | ⚪ Intentional? |
| **JAX-RS Client** | Client proxies for JAX-RS interfaces | **Missing** | ❌ Missing |

### Advice:
*   **I18n**: Essential for any serious application.
*   **RPC**: For TeaVM, using standard REST calls (via something like Flavour or standard generic proxies) is likely preferred over porting Errai Bus.

## Summary of Recommendations

1.  **High Priority**: Complete **CDI Events** (`@Observes`) implementation.
2.  **High Priority**: Complete **CDI Qualifiers** (`@Named`) implementation.
3.  **Medium Priority**: Implement **CDI Producers** (`@Produces`) to allow more flexible bean creation.
4.  **Medium Priority**: Add **I18n** support.
5.  **Medium Priority**: Add **Converters** for data binding.
