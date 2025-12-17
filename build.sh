#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies from root requirements.txt
pip install -r requirements.txt

# Run migrations and collect static files
cd backend
python manage.py collectstatic --no-input
python manage.py migrate
