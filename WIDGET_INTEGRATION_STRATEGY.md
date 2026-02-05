# Widget Integration Strategy: Porting GWTBootstrap to Tearay

## Executive Summary
Porting **GWTBootstrap** (which relies on GWT Widgets and Generators) directly is not feasible because TeaVM does not support GWT Generators and has a different DOM overlay system.

However, we can replicate the *functionality* and *developer experience* of GWTBootstrap by building a **Component Library** using the Tearay framework.

## Strategies

### 1. The "Native HTML" Approach (CSS-only components)
For simple widgets like Buttons, Labels, and Alerts, GWTBootstrap mostly just applies CSS classes.
In Tearay, we can achieve this directly in the HTML template.

**GWT:**
```java
Button b = new Button("Click me");
b.setType(ButtonType.PRIMARY);
```

**Tearay:**
```html
<button class="btn btn-primary">Click me</button>
```
*Pros:* Zero overhead, full control.
*Cons:* No Java abstraction, duplication of class strings.

### 2. The "Composite Component" Approach (Reusable Widgets)
We can create reusable `@Templated` components that encapsulate the HTML structure and logic.

**Example: `BootstrapButton.java`**
```java
@Templated
public class BootstrapButton {
    @Inject public HTMLElement element; // The <button> tag

    public void setText(String text) { element.setInnerText(text); }
    public void setStyle(String style) { element.setClassName("btn btn-" + style); }
}
```

**Usage in Parent:**
```java
@Inject @DataField
private BootstrapButton myButton;
```

**Requirements:**
To support this, our `TemplatedProcessor` must be upgraded to support **Nested Components**. Currently, it only binds `HTMLElement` fields. It needs to detect if a field is a POJO (Component) and:
1. Instantiate it via Factory.
2. Bind it to the DOM (replace the placeholder).

### 3. The "JSO Wrapper" Approach (JS-heavy widgets)
For complex widgets like **Modals**, **Tooltips**, and **DatePickers**, we need to interact with `bootstrap.js`.
We can write TeaVM JSO wrappers.

```java
@JSBody(params = {"element"}, script = "$(element).modal('show');")
public static native void showModal(HTMLElement element);
```

## Recommended Plan
1.  **Upgrade the Framework**: Update `TemplatedProcessor` to support injecting other `@Templated` components into `@DataField`s. This is the foundation of any "Widget Library".
2.  **Create a Sample Widget**: Implement a `CounterWidget` (simple composite) to prove the architecture.
3.  **Integrate Bootstrap**: Add `bootstrap.css` and `bootstrap.js` to the `index.html`.
4.  **Implement a Bootstrap Widget**: Create a `Modal` component that wraps the Bootstrap JS logic.

This approach aligns with modern SPA development (Component-based) rather than the old GWT Widget-based approach.
