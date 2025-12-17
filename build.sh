#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies from root requirements.txt
pip install -r requirements.txt

echo "Dependencies installed successfully"
