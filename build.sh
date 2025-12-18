#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies from root requirements.txt
pip install -r requirements.txt

# Run migrations during build
python backend/manage.py migrate --no-input

# Collect static files
python backend/manage.py collectstatic --no-input

echo "Build completed successfully"
