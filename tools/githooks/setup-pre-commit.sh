#!/bin/bash

# Ensure .git/hooks exists
mkdir -p .git/hooks

# Link the pre-commit hook
ln -sf ../../tools/githooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ pre-commit hook set up!"
