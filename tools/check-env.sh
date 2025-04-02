#!/bin/bash

set -e

# --- Java Check ---
echo "🔍 Checking Java version..."
JAVA_VERSION_OUTPUT=$(java -version 2>&1)
JAVA_MAJOR_VERSION=$(echo "$JAVA_VERSION_OUTPUT" | awk -F[\".] '/version/ {print $2}')

if [[ -z "$JAVA_MAJOR_VERSION" || "$JAVA_MAJOR_VERSION" -lt 21 ]]; then
  echo "❌ Java 21+ is required. Found: $JAVA_VERSION_OUTPUT"
  exit 1
else
  echo "✅ Java version $JAVA_MAJOR_VERSION detected."
fi

# --- Node.js Check ---
echo "🔍 Checking Node.js version..."
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed."
  exit 1
fi

NODE_MAJOR_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [[ "$NODE_MAJOR_VERSION" -lt 20 ]]; then
  echo "❌ Node.js 20+ is required. Found: $(node -v)"
  exit 1
else
  echo "✅ Node.js version $(node -v) detected."
fi

# --- Docker Check ---
echo "🔍 Checking Docker..."
if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed."
  exit 1
fi

if ! docker info &> /dev/null; then
  echo "❌ Docker is installed but not running or not accessible."
  exit 1
else
  echo "✅ Docker is installed and running."
fi

echo "🌱 Environment check passed."
exit 0
