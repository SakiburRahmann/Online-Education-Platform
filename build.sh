#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r backend/requirements/base.txt
pip install -r backend/requirements/production.txt

# Run migrations and collect static files
cd backend
python manage.py collectstatic --no-input
python manage.py migrate
