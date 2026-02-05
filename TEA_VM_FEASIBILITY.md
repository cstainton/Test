# Feasibility Study: Porting Errai UI Concepts to TeaVM

## Executive Summary
It is **highly feasible** to build a Single Page Application (SPA) framework that mimics the developer experience of **Errai UI** using the **TeaVM** compiler. However, it is **not possible** to simply recompile the existing Errai UI codebase with TeaVM.

The core reason is that Errai UI relies heavily on **GWT Generators** (Deferred Binding) for its magic (templating, data binding, dependency injection). TeaVM does not support GWT Generators.

To achieve "something similar," one would need to re-implement the framework's "kernel" using **Java Annotation Processors (APT)**.

## Architectural Analysis

### 1. The Errai UI (GWT) Approach
Errai UI allows developers to write pure Java classes annotated with `@Templated` and `@DataField`.
*   **Mechanism**: When the GWT compiler runs, it invokes a specific **Generator**.
*   **Process**: The Generator reads the HTML template, parses it, and produces a new Java class (source code) that:
    1.  Constructs the DOM hierarchy (often using `HTMLPanel` or `Element`).
    2.  Locates elements with `data-field` attributes.
    3.  Assigns these elements to the annotated fields in your class.
*   **Result**: This generated code is then compiled to JavaScript.

### 2. The TeaVM Approach
TeaVM operates on compiled Java **bytecode** (.class files), not source code. It does not have a "Generator" phase during compilation that allows creating new classes on the fly in the same way GWT does.

#### The Solution: Annotation Processing (APT)
To replicate Errai's behavior in TeaVM, we must shift the code generation to the `javac` phase (standard Java compilation).

*   **Mechanism**: We would create a **Java Annotation Processor**.
*   **Process**:
    1.  The APT runs when `javac` compiles your project.
    2.  It finds classes annotated with `@Templated`.
    3.  It reads the HTML file.
    4.  It generates a subclass (e.g., `MyPage_ViewImpl.java`) that contains the TeaVM-compatible DOM logic to wire the elements.
*   **Result**: The generated source is compiled to bytecode by `javac`, and then TeaVM translates that bytecode to JavaScript.

## Implementation Roadmap

To build a "TeaVM-Errai" framework, the following components are needed:

### Phase 1: The Templating Engine (APT)
Create an Annotation Processor that implements the `@Templated` logic.
*   **Input**: A Java class and an HTML file.
*   **Output**: A generated class that implements the view logic.
*   **Tech Stack**: JavaPoet (for writing Java files), Jsoup (for parsing HTML at build time).

### Phase 2: DOM Bindings
Errai wraps GWT Widgets/Elements. TeaVM uses `teavm-jso`.
*   The generated code must use TeaVM's `org.teavm.jso.dom.html.HTMLElement`.
*   Instead of `GWT.create()`, the application would likely use a generated factory or Dependency Injection to instantiate the view implementations.

### Phase 3: Dependency Injection (DI)
Errai uses generic CDI (Contexts and Dependency Injection).
*   **Option A**: Use a TeaVM-compatible DI library (TeaVM already supports some limited CDI-like features via Flavour).
*   **Option B**: Write a simple compile-time DI system (again, using APT) similar to Dagger 2 but simplified for this framework.

## Comparison Table

| Feature | Errai UI (GWT) | TeaVM Equivalent Strategy |
| :--- | :--- | :--- |
| **Compilation** | Source -> JavaScript | Bytecode -> JavaScript |
| **Metaprogramming** | GWT Generators (Deferred Binding) | Java Annotation Processors (APT) |
| **DOM Access** | JSNI / GWT Element | TeaVM JSO (`@JSBody`) |
| **Templating** | Runtime parsing (Dev Mode) or Compile-time (Prod) | Compile-time (APT) |
| **Reflection** | Simulated via Generators | Limited / Requires Config |

## Conclusion
You can achieve the *exact same developer experience* (DX) as Errai UI:
```java
@Templated("MyView.html")
public class MyView {
    @Inject @DataField
    private HTMLButtonElement submitButton;
}
```
However, the underlying machinery must be completely swapped out. You would essentially be building a **TeaVM-native clone of Errai UI** powered by Annotation Processors.
