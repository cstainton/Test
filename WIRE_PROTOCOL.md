# Wire Protocol Documentation

This document describes the current "Wire" protocol implementation used in the Verrai project for serialization and deserialization.

## Overview

The framework provides a custom serialization mechanism that supports both **JSON** and **Protobuf** formats. It uses annotation processing to generate codecs at compile time, avoiding reflection overhead at runtime (which is crucial for TeaVM).

The core components are located in:
- `verrai-api`: `uk.co.instanto.tearay.api.wire` (Annotations and Interfaces)
- `verrai-processor`: `uk.co.instanto.tearay.processor.WireProcessor` (Code Generation)

## Annotations

### `@Proto`
Mark a class with `@Proto` to enable codec generation for it.
- `subTypes()`: Array of classes for polymorphic handling (JSON only).
- `typeField()`: Field name to use as discriminator for polymorphism (JSON only).

### `@ProtoField`
Mark fields within a `@Proto` class to include them in the serialization.
- `id()`: The Protobuf tag ID (required for Proto format, ignored for JSON but good practice to keep consistent).

## Code Generation

The `WireProcessor` generates two codec classes for each `@Proto` annotated class:
1.  **`[ClassName]JsonCodec`**: Handles JSON serialization using `JsonWriter` and `JsonReader`.
2.  **`[ClassName]ProtoCodec`**: Handles Protobuf serialization using `ProtoWriter` and `ProtoReader` (from `com.squareup.wire`).

It also generates a central registry:
- **`uk.co.instanto.tearay.wire.generated.WireCodecRegistryImpl`**: Manages all generated codecs and allows switching between JSON and Proto modes via `setMode(WireMode mode)`.

## Usage Example

### 1. Define the DTO

```java
@Proto
public class User {
    @ProtoField(id = 1)
    public String name;

    @ProtoField(id = 2)
    public int age;

    @ProtoField(id = 3)
    public List<String> roles;
}
```

### 2. Use the Registry

You typically inject or instantiate the `WireCodecRegistryImpl` (generated code).

```java
WireCodecRegistryImpl registry = new WireCodecRegistryImpl();

// JSON Mode (Default)
registry.setMode(WireMode.JSON);
Codec<User> userCodec = registry.getCodec(User.class);
// userCodec.encode(user, jsonWriter);

// Proto Mode
registry.setMode(WireMode.PROTO);
Codec<User> protoCodec = registry.getCodec(User.class);
// protoCodec.encode(user, protoWriter);
```

## Maturity Assessment

**Status: Experimental / Proof of Concept**

### JSON Support
- **Supported Types**: Primitives (`int`, `double`, `boolean`), `String`, `List`, Nested Objects.
- **Polymorphism**: Supported via `subTypes` and `typeField`.
- **Maturity**: Functional for standard use cases.
- **Missing**: Map support, complex polymorphism handling might need more testing.

### Protobuf Support
- **Supported Types**: `int` (varint32), `boolean` (varint32), `String` (length-delimited), `List` (of Strings or Nested Objects), Nested Objects.
- **Maturity**: **Basic**. The implementation relies on `com.squareup.wire` but covers only a subset of Protobuf features.
- **Limitations**:
    - No support for `long`, `float`, `double` (only `int`/`boolean` varint32 found in processor).
    - No support for Maps.
    - No support for Enums.
    - No support for `packed` repeated fields.
    - **No unit tests found** in the codebase specifically targeting the `WireProcessor` or generated codecs.

## RPC Integration

When introducing RPC components, you should integrate with this wire format as follows:

1.  **Service Definition**: Define your Request and Response objects as `@Proto` annotated classes.
2.  **Serialization**: Use the `WireCodecRegistryImpl` to obtain the appropriate codec for the request/response type.
3.  **Transport**:
    - For **JSON-RPC** style communication, use `WireMode.JSON`. This is recommended for initial development due to easier debugging and broader type support in the current implementation.
    - For **gRPC** or binary protocols, use `WireMode.PROTO`. However, you **must** verify that your data types are supported (e.g., avoid `long` or `double` fields until support is added to `WireProcessor`).

**Recommendation**: Start with JSON support for the RPC implementation. If binary performance is required, the `WireProcessor` will need to be extended to support more Protobuf types (Long, Double, Enums) and comprehensive tests should be added.
