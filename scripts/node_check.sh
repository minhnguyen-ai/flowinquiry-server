#!/bin/bash

# Set the required Node.js version as a variable
REQUIRED_NODE_VERSION=18

# Function to compare two versions
version_ge() {
    # Compare two versions properly by splitting them into arrays
    local ver1=$1
    local ver2=$2

    if [[ "$ver1" == "$ver2" ]]; then
        return 0
    fi

    ver1_arr=(${ver1//./ })
    ver2_arr=(${ver2//./ })

    for i in {0..2}; do
        if [[ ${ver1_arr[$i]:-0} -gt ${ver2_arr[$i]:-0} ]]; then
            return 0
        elif [[ ${ver1_arr[$i]:-0} -lt ${ver2_arr[$i]:-0} ]]; then
            return 1
        fi
    done

    return 0
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed."
    exit 1
fi

# Get the installed Node.js version
node_version=$(node -v | sed 's/v//')  # Remove the 'v' from the version string

# Check if the Node.js version is valid
if [ -z "$node_version" ]; then
    echo "Failed to determine the Node.js version."
    exit 1
fi

# Display the Node.js version
echo "Node.js version: $node_version"

# Check if the Node.js version is greater than or equal to the required version
if version_ge "$node_version" "$REQUIRED_NODE_VERSION"; then
    echo "Node.js version is $node_version, which is greater than or equal to $REQUIRED_NODE_VERSION."
    exit 0
else
    echo "Node.js version is $node_version, which is less than $REQUIRED_NODE_VERSION."
    exit 1
fi