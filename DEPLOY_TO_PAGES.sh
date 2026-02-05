#!/bin/bash
set -e

# 1. Build the project
echo "Building Tearay App..."
cd tearay
mvn clean package

# 2. Create distribution directory
echo "Creating dist directory..."
rm -rf ../dist
mkdir -p ../dist/tearay

# 3. Copy static assets
echo "Copying static assets..."
cp tearay-app/src/main/webapp/index.html ../dist/index.html

# 4. Copy generated JavaScript
echo "Copying generated JS..."
# Note: The path depends on where TeaVM outputs. Usually target/tearay-app-1.0-SNAPSHOT/teavm/classes.js
# Or target/generated/teavm/classes.js
JS_PATH="tearay-app/target/tearay-app-1.0-SNAPSHOT/tearay/classes.js"
if [ ! -f "$JS_PATH" ]; then
    # Fallback/Check
    JS_PATH=$(find tearay-app/target -name classes.js | head -n 1)
fi

if [ -f "$JS_PATH" ]; then
    cp "$JS_PATH" ../dist/tearay/classes.js
    echo "Successfully copied classes.js"
else
    echo "Error: classes.js not found!"
    exit 1
fi

echo "Deployment preparation complete. Contents of dist:"
ls -R ../dist
