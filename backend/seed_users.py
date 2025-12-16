import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

User = get_user_model()

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(username='admin', email='admin@example.com', password='admin123')
    print('Superuser "admin" created.')
else:
    print('Superuser "admin" already exists.')

if not User.objects.filter(username='student').exists():
    User.objects.create_user(username='student', email='student@example.com', password='student123', role='student')
    print('Student user "student" created.')
else:
    print('Student user "student" already exists.')
