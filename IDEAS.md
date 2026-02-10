# Verrai Project Ideas & Roadmap

This document outlines potential enhancements and features for the Verrai framework, based on a comparison with Errai and current architectural trends.

## 1. Core Framework Enhancements

### Validation Integration
**Goal**: Seamless integration between Data Binding and Validation.
-   **Current State**: `dev.verrai.api.validation` exists but is not used by generated `Binder` classes.
-   **Proposal**:
    -   Update `TemplatedProcessor` to detect `Validator<T>` usage or `@Constraint` annotations.
    -   Generate logic in `Binder.bind()` to trigger validation on input changes (e.g., `input` or `change` events).
    -   Expose validation errors to the UI automatically (e.g., adding `.is-invalid` class).

### RPC Modernization & Standardization
**Goal**: complete the transition to a fully generated, type-safe RPC layer.
-   **Current State**: Mix of manual `uk.co.instanto.client.service.RpcClient` and new `dev.verrai.api.wire` generators.
-   **Proposal**:
    -   Deprecate and remove `uk.co.instanto` packages.
    -   Ensure `ServiceGenerator` (in `verrai-annotation-processor`) produces fully functional client stubs.
    -   Standardize on `dev.verrai.api.wire` for all serialization.
    -   Implement "Shared Interfaces" pattern: Define service interface in a common module, generate client proxy and server endpoint automatically.

### Programmatic Data Binding
**Goal**: Allow binding logic without `@Templated` / dependency injection.
-   **Current State**: Binding is tightly coupled to `@Templated` components.
-   **Proposal**:
    -   Create a `DataBinder<T>` class that can be instantiated manually.
    -   `DataBinder.forType(User.class).bind(nameInput, "name")`.
    -   Useful for dynamic forms or non-templated widgets.

## 2. Developer Experience (DX)

### TeaVM Live Reload / Dev Server
**Goal**: Reduce the feedback loop during development.
-   **Current State**: Requires full Maven build -> TeaVM compile for changes.
-   **Proposal**:
    -   Investigate TeaVM's incremental compilation API.
    -   Create a Dev Mode runner that watches class files and updates the browser via WebSocket.

### IntelliJ / IDE Plugin
**Goal**: Assist with template-to-code navigation.
-   **Proposal**:
    -   Plugin to navigate from `@DataField` to HTML element.
    -   Autocomplete for `@Bound(property="...")`.
    -   Inspection for missing template files.

## 3. Component Ecosystem

### Expanded Widget Libraries
**Goal**: Provide a comprehensive set of UI components.
-   **Bootstrap**: Complete the implementation (Modals, Dropdowns, Tabs).
-   **Material**: Update to latest MDC Web or switch to Material 3.
-   **Datagrid**: A high-performance, virtualized data grid component (critical for enterprise apps).

### Shadow DOM Support
**Goal**: Encapsulate styles and markup.
-   **Proposal**:
    -   Add `shadow = true` to `@Templated`.
    -   Generate code to attach shadow root and render template inside it.

## 4. Testing & Quality

### Integration Test Harness
**Goal**: Test components in a headless environment without a full browser.
-   **Proposal**:
    -   Enhance `TeaVMTestRunner` to support a simulated DOM (like HtmlUnit or a lightweight mock).
    -   Allow testing of `@Templated` logic (event handlers, binding) in unit tests.

## 5. Security

### Granular Access Control
**Goal**: Fine-grained permissions beyond roles.
-   **Proposal**:
    -   Implement "Guards" or "Interceptors" for Navigation.
    -   Allow asynchronous checks (e.g., call server to verify permission before navigation).
