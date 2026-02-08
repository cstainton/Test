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
| **Event Handling** | `@EventHandler("field")` for UI events | **Missing** | ❌ Critical Gap |
| **Native Event Sinks** | `@SinkNative` | **Missing** | ❌ Missing |
| **Shadow DOM** | Supported | Not Supported | ⚪ Low Priority |

### Advice:
*   **Immediate Priority**: Implement `@EventHandler` support. This is fundamental for any interactive UI. Without it, developers must manually attach listeners in `@PostConstruct`, which defeats the purpose of declarative UI.
*   **Enhancement**: Improve nested component handling to ensure child components are properly instantiated and their lifecycle managed by the container.

## 2. Data Binding

| Feature | Errai Data Binding | Tearay (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Declarative Binding** | `@Bound` on fields | `@Bound` on fields | ✅ Parity |
| **Model Injection** | `@Inject @Model MyModel m;` | `@Inject @Model MyModel m;` | ✅ Parity |
| **Property Chains** | `@Bound(property="user.address.city")` | Supported via recursive getter generation | ✅ Parity |
| **Two-Way Sync** | Automatic (Model <-> Widget) | Automatic (Model <-> Widget) | ✅ Parity |
| **Converters** | Register generic/specific converters | **Missing** (Assumes type match) | ⚠️ Partial |
| **Validation** | JSR-303 integration | **Missing** | ❌ Critical Gap |
| **Programmatic Binding** | `DataBinder<T>` API | **Missing** | ❌ Missing |

### Advice:
*   **Validation**: Add basic support for validation, perhaps by integrating a lightweight validation library compatible with TeaVM.
*   **Converters**: Necessary for real-world apps (e.g., binding a `Date` object to a `TextInput`).

## 3. Navigation

| Feature | Errai Navigation | Tearay (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Page Definition** | `@Page(role = "home")` | `@Page(role = "home")` | ✅ Parity |
| **Lifecycle: Showing** | `@PageShowing` | `@PageShowing` | ✅ Parity |
| **Lifecycle: Shown** | `@PageShown` (DOM attached) | **Missing** | ⚠️ Gap |
| **Lifecycle: Hiding** | `@PageHiding` (Before remove) | **Missing** | ⚠️ Gap |
| **Lifecycle: Hidden** | `@PageHidden` (After remove) | `@PageHidden` | ✅ Parity |
| **State Management** | `@PageState` field injection | `@PageState` field injection | ✅ Parity |
| **Access Control** | `@RestrictedAccess` integration | `@RestrictedAccess` integration | ✅ Parity |

### Advice:
*   **Lifecycle**: Implement `@PageShown` and `@PageHiding`. `@PageShown` is crucial for logic that requires the element to be in the DOM (e.g., initializing 3rd party JS libs, measuring dimensions). `@PageHiding` is crucial for cleanup/cancellation.

## 4. IOC & CDI Features

| Feature | Errai IOC | Tearay (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Scopes** | `ApplicationScoped`, `Dependent`, `Singleton` | `ApplicationScoped`, `Dependent` | ✅ Parity |
| **Injection** | Field, Constructor, Setter | Field Injection only (mostly) | ⚠️ Partial |
| **Producers** | `@Produces` methods/fields | **Missing** | ❌ Missing |
| **Events** | `Event<T>`, `@Observes` | **Missing** | ❌ Critical Gap |
| **Qualifiers** | `@Named`, custom qualifiers | **Missing** (Basic interface resolution) | ❌ Missing |
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

1.  **High Priority**: Implement **`@EventHandler`**. It's the biggest friction point for UI development right now.
2.  **High Priority**: Complete **Navigation Lifecycle** (`@PageShown`, `@PageHiding`).
3.  **Medium Priority**: Implement **CDI Events** (`@Observes`) to allow loose coupling between components.
4.  **Medium Priority**: Add **I18n** support.
