#!/bin/bash

source scripts/shared.sh

# Call each script sequentially
run_script_stop_when_fail "valid_checks.sh"
run_script_stop_when_fail "init_environments.sh"
run_script_stop_when_fail "init_git_hooks.sh"