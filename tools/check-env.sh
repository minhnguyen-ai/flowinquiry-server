#!/bin/bash

set -e

echo "🔍 Starting environment check..."
echo

frontend_failures=()
backend_failures=()

# ==========================
# Backend Requirements
# ==========================

echo "⚙️  Backend Requirements"
echo

# --- Java Check ---
echo "🔍 Checking Java version..."
if command -v java >/dev/null 2>&1; then
  JAVA_VERSION_OUTPUT=$(java -version 2>&1)
  JAVA_MAJOR_VERSION=$(echo "$JAVA_VERSION_OUTPUT" | awk -F[\".] '/version/ {print $2}')
  if [[ -z "$JAVA_MAJOR_VERSION" || "$JAVA_MAJOR_VERSION" -lt 21 ]]; then
    echo "❌ Java 21+ is required. Found: $JAVA_VERSION_OUTPUT"
    backend_failures+=("Java 21+ not detected")
  else
    echo "✅ Java version $JAVA_MAJOR_VERSION detected."
  fi
else
  echo "❌ Java is not installed."
  backend_failures+=("Java not installed")
fi

echo

# --- Docker Check ---
echo "🔍 Checking Docker..."
if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed."
  backend_failures+=("Docker not installed")
elif ! docker info &> /dev/null; then
  echo "❌ Docker is installed but not running or not accessible."
  backend_failures+=("Docker not running or not accessible")
else
  echo "✅ Docker is installed and running."
fi

echo
echo "-----------------------------"
echo

# ==========================
# Frontend Requirements
# ==========================

echo "🎨 Frontend Requirements"
echo

# --- Node.js Check ---
echo "🔍 Checking Node.js version..."
if command -v node >/dev/null 2>&1; then
  NODE_MAJOR_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
  if [[ "$NODE_MAJOR_VERSION" -lt 20 ]]; then
    echo "❌ Node.js 20+ is required. Found: $(node -v)"
    frontend_failures+=("Node.js 20+ not detected")
  else
    echo "✅ Node.js version $(node -v) detected."
  fi
else
  echo "❌ Node.js is not installed."
  frontend_failures+=("Node.js not installed")
fi

echo

# --- pnpm Check ---
echo "🔍 Checking pnpm version..."
if command -v pnpm >/dev/null 2>&1; then
  PNPM_VERSION=$(pnpm --version)
  echo "✅ pnpm version: $PNPM_VERSION"
else
  echo "❌ pnpm is not installed."
  echo "Please install pnpm by following the instructions at https://pnpm.io/installation."
  frontend_failures+=("pnpm not installed")
fi

echo
echo "============================="
echo "📋 Summary"
echo "============================="

if [ ${#backend_failures[@]} -eq 0 ]; then
  echo "✅ Backend environment is properly configured."
else
  echo "❌ Backend environment has issues:"
  for fail in "${backend_failures[@]}"; do
    echo "   - $fail"
  done
fi

echo

if [ ${#frontend_failures[@]} -eq 0 ]; then
  echo "✅ Frontend environment is properly configured."
else
  echo "❌ Frontend environment has issues:"
  for fail in "${frontend_failures[@]}"; do
    echo "   - $fail"
  done
fi

echo
if [[ ${#backend_failures[@]} -eq 0 && ${#frontend_failures[@]} -eq 0 ]]; then
  echo "🌱 All environment checks passed!"
  exit 0
else
  echo "⚠️ Please resolve the above issues before proceeding."
  exit 1
fi
