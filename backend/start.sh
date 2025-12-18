echo "--- VERSION: 2.0.0 (Dec 19 Fix) ---"
echo "--- STARTING DEPLOYMENT STARTUP ---"

# Wait for DB to be reachable if needed (optional but recommended for robustness)
echo "Waiting for database..."
cd backend
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
while attempts < 10:
    try:
        connections['default'].cursor()
        print('Database is ready!')
        break
    except OperationalError:
        attempts += 1
        print(f'Database not ready (attempt {attempts})...')
        time.sleep(2)
else:
    print('Failed to connect to database after 10 attempts')
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
