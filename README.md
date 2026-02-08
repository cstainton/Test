# Tearay - TeaVM SPA Framework PoC

**Tearay** is a Proof of Concept (PoC) framework for building Single Page Applications (SPAs) in Java using the [TeaVM](https://teavm.org/) compiler. It emulates core concepts from the [JBoss Errai](https://github.com/errai/errai) framework, such as Dependency Injection, Templating, and Navigation, but targets TeaVM's lightweight, bytecode-to-JavaScript compilation model.

## Features

*   **Dependency Injection (IoC)**: Annotation-based DI using `javax.inject` (`@Inject`, `@ApplicationScoped`). Implemented via a custom Annotation Processor (`IOCProcessor`) that generates factories at compile time.
*   **Templating**: Declarative UI binding using `@Templated` and `@DataField`. HTML templates are parsed at compile time, and Java fields are automatically bound to DOM elements or nested Widgets.
*   **Navigation**: Type-safe client-side routing using `@Page`, `@PageShowing`, and `@PageState`. Supports browser history management and parameter passing between pages.
*   **Widget Library**: A built-in module (`tearay-widgets`) providing wrappers for **Bootstrap 5** components (Buttons, Cards, Navbars, Modals, Forms) that integrate seamlessly with the templating system.
*   **Security**: Role-based access control for pages using `@RestrictedAccess` and a `SecurityProvider` interface.

## Project Structure

*   `tearay-api`: Core annotations and interfaces (`@Page`, `@Templated`, `Navigation`, etc.).
*   `tearay-processor`: Java Annotation Processors that generate the wiring code (Factories, Binders, Navigation implementation).
*   `tearay-widgets`: Reusable UI components wrapping Bootstrap 5.
*   `tearay-app`: A sample application demonstrating the framework features.

## Building the Project

Prerequisites: JDK 11+, Maven 3+.

```bash
mvn clean package
```

This will compile the project and generate the web application WAR file:
`tearay-app/target/tearay-app-1.0-SNAPSHOT.war`

The TeaVM-generated JavaScript will be located in `tearay-app/target/generated/teavm/classes.js`.

## Running the App

### Static Deployment (GitHub Pages)
The project includes scripts to package the app for static hosting:

1.  Run `./DEPLOY_TO_PAGES.sh` to build and populate the `dist/` directory.
2.  Serve the `dist/` directory using any static file server (e.g., `python3 -m http.server` inside `dist`).

### WAR Deployment
Deploy the generated `.war` file to any Servlet container (Tomcat, Jetty).

## Key Concepts

### Creating a Page
```java
@Page(role = "dashboard")
@Templated // Binds to DashboardPage.html
public class DashboardPage {
    @Inject @DataField
    private Button myButton;

    @PageShowing
    public void onOpen() {
        myButton.setText("Hello Tearay!");
    }
}
```

### Navigating
```java
@Inject Navigation nav;
// ...
nav.goTo("dashboard");
```

## Documentation

*   [Comparison with Errai](COMPARISON.md)

## License
This project is a Proof of Concept and serves as a technical demonstration.
