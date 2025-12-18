web: cd backend && python manage.py migrate --no-input && python seed_users.py && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
