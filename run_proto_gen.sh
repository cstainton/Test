#!/bin/bash
set -e

# Define paths
COMMON_DIR="common-service"
SRC_DIR="$COMMON_DIR/src/main/java"
TARGET_DIR="$COMMON_DIR/target"
CLASSES_DIR="$TARGET_DIR/classes"
OUTPUT_PROTO_DIR="$COMMON_DIR/src/main/proto"

# Create compilation directory
mkdir -p "$CLASSES_DIR"

# Explicitly find protobuf jars (assuming they are in local Repo or download them)
# For this script we will try to reuse the Maven dependency classpath if possible, 
# or just assume they are available. 
# Simplification: We will run 'mvn compile' first (skip wire?)
# Problem: 'mvn compile' runs Wire first.

# Workaround: Compile Generator and POJO manually with minimal dependencies
echo "Compiling Generator and POJO..."
javac -d "$CLASSES_DIR" \
    -cp "$HOME/.m2/repository/io/protostuff/protostuff-core/1.8.0/protostuff-core-1.8.0.jar:$HOME/.m2/repository/io/protostuff/protostuff-runtime/1.8.0/protostuff-runtime-1.8.0.jar:$HOME/.m2/repository/io/protostuff/protostuff-api/1.8.0/protostuff-api-1.8.0.jar:$HOME/.m2/repository/io/protostuff/protostuff-collectionschema/1.8.0/protostuff-collectionschema-1.8.0.jar" \
    "$SRC_DIR/uk/co/instanto/common/tool/JavaToProtoGenerator.java" \
    "$SRC_DIR/uk/co/instanto/common/service/MyData.java"

# Run Generator
echo "Generating Proto for MyData..."
java -cp "$CLASSES_DIR:$HOME/.m2/repository/io/protostuff/protostuff-core/1.8.0/protostuff-core-1.8.0.jar:$HOME/.m2/repository/io/protostuff/protostuff-runtime/1.8.0/protostuff-runtime-1.8.0.jar:$HOME/.m2/repository/io/protostuff/protostuff-api/1.8.0/protostuff-api-1.8.0.jar:$HOME/.m2/repository/io/protostuff/protostuff-collectionschema/1.8.0/protostuff-collectionschema-1.8.0.jar" \
    uk.co.instanto.common.tool.JavaToProtoGenerator \
    "$OUTPUT_PROTO_DIR" \
    "uk.co.instanto.common.service.MyData"

echo "Done."
