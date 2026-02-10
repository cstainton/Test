# Comparison: Verrai vs Errai UI

This document compares the current state of the **Verrai** framework with **Errai UI** (latest version), focusing on feature parity, missing components, and architectural differences.

## 1. Templating & Component Model

| Feature | Errai UI | Verrai (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Declarative Templates** | `@Templated("file.html")` | `@Templated("file.html")` | ✅ Parity |
| **Field Binding** | `@DataField` binds elements/widgets | `@DataField` binds elements/widgets | ✅ Parity |
| **Element Replacement** | Replaces placeholder with Widget root | Replaces placeholder with `widget.element` (or `IsWidget`) | ✅ Parity |
| **Attribute Merging** | Merges `class`, `style`, `id` from template | Merges `class`, `style`, `id` (implemented in `TemplatedProcessor`) | ✅ Parity |
| **Nested Components** | `@Inject @DataField MyComponent c;` auto-instantiated | `@Inject @DataField MyComponent c;` manual instantiation required often | ⚠️ Partial |
| **Event Handling** | `@EventHandler("field")` for UI events | `@EventHandler("field")` for UI events | ✅ Parity |
| **Native Event Sinks** | `@SinkNative` | **Supported** (String based) | ✅ Parity |
| **Shadow DOM** | Supported | Not Supported | ⚪ Low Priority |

### Advice:
*   **Enhancement**: Improve nested component handling to ensure child components are properly instantiated and their lifecycle managed by the container.

## 2. Data Binding & Validation

| Feature | Errai Data Binding | Verrai (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Declarative Binding** | `@Bound` on fields | `@Bound` on fields | ✅ Parity |
| **Model Injection** | `@Inject @Model MyModel m;` | `@Inject @Model MyModel m;` | ✅ Parity |
| **Property Chains** | `@Bound(property="user.address.city")` | Supported via recursive getter generation | ✅ Parity |
| **Two-Way Sync** | Automatic (Model <-> Widget) | Automatic (Model <-> Widget) | ✅ Parity |
| **Converters** | Register generic/specific converters | **Supported** (`ConverterRegistry` in `dev.verrai.api.binding`) | ✅ Parity |
| **Validation** | JSR-303 integration | **API Only** (`dev.verrai.api.validation`), not integrated with Binder | ⚠️ Partial |
| **Programmatic Binding** | `DataBinder<T>` API | **Missing** | ❌ Missing |

### Advice:
*   **Validation**: Integrate the `Validator` API with the generated `Binder` classes to trigger validation on field updates.

## 3. Navigation

| Feature | Errai Navigation | Verrai (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Page Definition** | `@Page(role = "home")` | `@Page(role = "home")` | ✅ Parity |
| **Lifecycle: Showing** | `@PageShowing` | `@PageShowing` | ✅ Parity |
| **Lifecycle: Shown** | `@PageShown` (DOM attached) | `@PageShown` (DOM attached) | ✅ Parity |
| **Lifecycle: Hiding** | `@PageHiding` (Before remove) | `@PageHiding` (Before remove) | ✅ Parity |
| **Lifecycle: Hidden** | `@PageHidden` (After remove) | `@PageHidden` | ✅ Parity |
| **State Management** | `@PageState` field injection | `@PageState` field injection | ✅ Parity |
| **Access Control** | `@RestrictedAccess` integration | **Supported** (`@RestrictedAccess` + `SecurityProvider`) | ✅ Parity |

### Advice:
*   **Enhancement**: Consider implementing "Navigation Interceptors" or "Guards" for more complex access control scenarios beyond simple role checks.

## 4. IOC & CDI Features

| Feature | Errai IOC | Verrai (Current) | Status |
| :--- | :--- | :--- | :--- |
| **Scopes** | `ApplicationScoped`, `Dependent`, `Singleton` | `ApplicationScoped`, `Dependent` | ✅ Parity |
| **Injection** | Field, Constructor, Setter | Field Injection only (mostly) | ⚠️ Partial |
| **Producers** | `@Produces` methods/fields | **Supported** (`@Produces` on methods) | ✅ Parity |
| **Events** | `Event<T>`, `@Observes` | `@Observes` supported | ✅ Parity |
| **Qualifiers** | `@Named`, custom qualifiers | **Supported** (`@Named`, custom qualifiers) | ✅ Parity |
| **Proxying** | Client-side proxies for circular deps | **Missing** (Simple factory chains) | ⚠️ Partial |

### Advice:
*   **Events**: Implement a simple `EventBus` and `@Observes` processor. This decouples components significantly.

## 5. Ecosystem Features

| Feature | Errai | Verrai | Status |
| :--- | :--- | :--- | :--- |
| **I18n** | `@Bundle`, TranslationService | **Supported** (`@Bundle` in `dev.verrai.api.i18n`) | ✅ Parity |
| **RPC / Bus** | Errai Bus (Client-Server) | **Custom** (Proto/JSON over Stomp/WebSockets) | ⚠️ Partial |
| **JAX-RS Client** | Client proxies for JAX-RS interfaces | **Missing** (Transitioning to Generated Services) | ⚠️ Partial |
| **Persistence** | Data Sync / JPA | **Supported** (Client-side JPA-like over IndexedDB) | ✅ Parity |
| **Widgets** | Errai UI Components | **Supported** (Bootstrap & Material implementations) | ✅ Parity |

### RPC Note:
Verrai implements a custom RPC mechanism based on Protocol Buffers and JSON (`dev.verrai.api.wire`). It supports streaming and is transitioning towards fully generated service proxies and stubs, distinct from the Errai Bus approach but serving the same purpose.

## Summary of Recommendations

1.  **High Priority**: Integrate **Validation** with Data Binding.
2.  **Medium Priority**: complete the RPC transition to generated code (`dev.verrai.rpc`).
3.  **Medium Priority**: Implement **Programmatic Binding** API.
4.  **Low Priority**: Add **Shadow DOM** support.
