# Errai UI Binding Rules Analysis

This document describes the rules Errai UI uses to bind fields annotated with `@DataField` to the HTML template, and compares them with the **Tearay** implementation.

## 1. The General Binding Contract

When a class is annotated with `@Templated`, Errai/Tearay scans fields annotated with `@DataField`.

### Rule 1: The Matching Strategy
*   **Errai**: Looks for an element in the HTML file with a `data-field` attribute matching the field name (or the value of the annotation).
*   **Tearay**: Identical behavior. Uses `querySelector("[data-field='name']")`.

### Rule 2: Element Binding (DOM to DOM)
If the Java field type is a native DOM element (e.g., `HTMLElement`, `DivElement`):
*   **Errai**: The Java field refers to the *exact* element parsed from the HTML template. Modifications to the field affect the template's DOM.
*   **Tearay**: Identical behavior. The generated code casts the found element to the field type.

### Rule 3: Widget Binding (Widget replacement)
If the Java field type is a Component/Widget (e.g., `Button`, `Composite`):
*   **Errai**: The element in the HTML template acts as a **placeholder**.
    *   The framework instantiates the Widget (via Injector).
    *   The Widget's root element **replaces** the placeholder element in the DOM tree.
*   **Tearay**: Identical behavior. The `TemplatedProcessor` generates `replaceChild(widget.element, placeholder)`.

### Rule 4: Attribute Merging
When replacing a placeholder with a Widget, what happens to the attributes defined in the HTML (e.g., `<div data-field="btn" class="my-class">`)?
*   **Errai**:
    *   **CSS Classes**: Merged. The classes on the placeholder are *added* to the Widget's existing classes.
    *   **ID**: The placeholder's ID typically overrides the Widget's ID if present.
    *   **Style**: Merged (concatenated).
    *   **Events**: Event handlers attached via `@EventHandler` in Java are bound to the Widget.
*   **Tearay**:
    *   **Current Status**: Implemented attribute merging for `class`, `id`, and `style`.
    *   The generated code reads `placeholder.getClassName()` and appends it to `widget.element`.

### Rule 5: Inner HTML / Content
*   **Errai**: Any HTML content *inside* the placeholder tag is usually **discarded** unless the Widget implementation specifically extracts and preserves it (e.g., creating a `HTMLPanel` and moving the children).
*   **Tearay**: Currently discards inner content (standard `replaceChild` behavior).

## Conclusion
The **Tearay** PoC implementation accurately emulates the core binding rules of Errai UI. The "Widget Replacement" strategy combined with "Attribute Merging" allows developers to style components in the HTML template while managing logic in the Java Component.
