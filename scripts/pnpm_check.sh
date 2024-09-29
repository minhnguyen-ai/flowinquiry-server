#!/bin/bash

# Check if pnpm is installed by trying to execute it
if command -v pnpm >/dev/null 2>&1; then
    echo "pnpm is installed."
    # Optionally, display the pnpm version
    pnpm_version=$(pnpm --version)
    echo "pnpm version: $pnpm_version"
else
    echo "pnpm is not installed."
    echo "Please install pnpm by following the instructions at https://pnpm.io/installation."
    exit 1
fi