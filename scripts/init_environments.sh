#!/bin/bash

# Define file paths
template_file=".env.local.example"
output_file=".env.local"

# Check if the output file already exists
if [ -f "$output_file" ]; then
    # Ask for confirmation to overwrite the file
    read -p "$output_file already exists. Do you want to replace it? (y/n): " confirm
    if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
        echo "Aborting. $output_file will not be replaced."
        exit 0
    fi
fi

# Copy content from .env.example to .env
if [ -f "$template_file" ]; then
    cp "$template_file" "$output_file"
    echo "Copied content from $template_file to $output_file."
else
    echo "Template file $template_file not found. Exiting."
    exit 1
fi

# Run npx auth and append its output to .env
npx auth secret >> "$output_file"

# Check if the npx auth command succeeded
if [ $? -ne 0 ]; then
    echo "Failed to run npx auth. Exiting."
    exit 1
else
    echo "Appended output of npx auth to $output_file."
fi

echo "Initialization complete."