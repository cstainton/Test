#!/bin/bash
set -e

# 1. Build the project
echo "Building Verrai App..."
cd tearay
mvn clean package

# 2. Create distribution directory
echo "Creating dist directory..."
rm -rf ../dist
mkdir -p ../dist/verrai

# 3. Copy static assets
echo "Copying static assets..."
cp verrai-app/src/main/webapp/index.html ../dist/index.html
if [ -f "verrai-app/src/main/webapp/material.html" ]; then
    cp verrai-app/src/main/webapp/material.html ../dist/material.html
fi

# 4. Copy generated JavaScript
echo "Copying generated JS..."
# Note: The path depends on where TeaVM outputs. Usually target/verrai-app-1.0-SNAPSHOT/teavm/classes.js
# Or target/generated/teavm/classes.js
JS_PATH="verrai-app/target/verrai-app-1.0-SNAPSHOT/tearay/classes.js"
if [ ! -f "$JS_PATH" ]; then
    # Fallback/Check
    JS_PATH=$(find verrai-app/target -name classes.js | head -n 1)
fi

if [ -f "$JS_PATH" ]; then
    cp "$JS_PATH" ../dist/verrai/classes.js
    echo "Successfully copied classes.js"
else
    echo "Error: classes.js not found!"
    exit 1
fi

echo "Deployment preparation complete. Contents of dist:"
ls -R ../dist
