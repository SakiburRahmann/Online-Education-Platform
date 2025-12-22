#!/usr/bin/env bash
# exit on error
# exit on error
set -o errexit

# Only cd into backend if we are not already there
if [ -d "backend" ]; then
  cd backend
fi

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
