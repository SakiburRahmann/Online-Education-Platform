echo "--- VERSION: 2.1.0 (Dec 19 Root Fix) ---"
echo "Current Directory: $(pwd)"

# If we are in the root, move to backend
if [ -d "backend" ]; then
    echo "Moving into backend directory..."
    cd backend
fi

# Exit on error after move
set -e

echo "--- STARTING DEPLOYMENT STARTUP ---"

# Wait for DB to be reachable
echo "Waiting for database..."
python -c "
import sys
import os
import django
import time
from django.db import connections
from django.db.utils import OperationalError

os.environ.setdefault('DJANGO_SETTINGS_MODULE', os.environ.get('DJANGO_SETTINGS_MODULE', 'config.settings.production'))
django.setup()

attempts = 0
while attempts < 15:
    try:
        connections['default'].cursor()
        print('Database is ready!')
        break
    except OperationalError:
        attempts += 1
        print(f'Database not ready (attempt {attempts})...')
        time.sleep(2)
else:
    print('Failed to connect to database after 15 attempts')
    sys.exit(1)
"

echo "Running Migrations..."
python manage.py migrate --no-input

echo "Running Seeding..."
python seed_users.py

echo "Verifying Users..."
python -c "
import os
import django
from django.contrib.auth import get_user_model
os.environ.setdefault('DJANGO_SETTINGS_MODULE', os.environ.get('DJANGO_SETTINGS_MODULE', 'config.settings.production'))
django.setup()
User = get_user_model()
print(f'Total Users in Database: {User.objects.count()}')
"

echo "Starting Gunicorn..."
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
