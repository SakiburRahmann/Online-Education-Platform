#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies from root requirements.txt
pip install -r requirements.txt

# Collect static files
python backend/manage.py collectstatic --no-input

echo "Build completed successfully"
