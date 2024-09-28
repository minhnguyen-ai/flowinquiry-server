#!/bin/bash

# Initialize an empty array to hold the names of failed scripts
failed_scripts=()

# Function to run a script and capture its status
run_script() {
    local script_name="$1"
    echo "Running $script_name..."

    # Run the script
    ./"$script_name"

    # Check if the script failed
    if [ $? -ne 0 ]; then
        echo "$script_name failed."
        failed_scripts+=("$script_name")  # Add to the failed scripts list
    else
        echo "$script_name succeeded."
    fi
}

# Run the scripts sequentially
run_script "node_check.sh"

# After running all scripts, check if any failed
if [ ${#failed_scripts[@]} -eq 0 ]; then
    echo "Your environments settings satisfy Flexwork's conditions"
else
    echo "The following scripts failed:"
    for script in "${failed_scripts[@]}"; do
        echo " - $script"
    done
    exit 1  # Optionally, exit with a failure status
fi

