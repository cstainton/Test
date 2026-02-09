---
description: Logging standards and usage for all code in the project
---

# Logging Standards

All code in this project MUST use **SLF4J** for logging. Do not use `System.out`, `System.err`, or `e.printStackTrace()`.

## Dependencies

The project uses these logging dependencies:

| Context | SLF4J Binding | Purpose |
|---------|---------------|---------|
| TeaVM (Browser) | `teavm-extras-slf4j` | Outputs to browser `console.log` |
| JVM Runtime | `slf4j-simple` | Outputs to stdout |

## Usage Pattern

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyClass {
    private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
    
    public void myMethod() {
        logger.debug("Debug message with placeholder: {}", value);
        logger.info("Info message");
        logger.warn("Warning message: {}", issue);
        logger.error("Error message", exception);
    }
}
```

## Log Levels

- **DEBUG**: Fine-grained diagnostic info (RPC calls, internal state)
- **INFO**: Significant events (startup, service registration, generated files)
- **WARN**: Potential problems (missing services, unexpected states)
- **ERROR**: Errors that need attention (with exception as last parameter)

## Key Points

1. Always use parameterized messages with `{}` placeholders - never string concatenation
2. For exceptions, pass the exception as the last argument to `logger.error()`
3. The logger field should be `private static final`
4. Use the class's own `Logger` - don't share loggers between classes
