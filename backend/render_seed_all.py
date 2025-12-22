import os
import django
import sys
from decimal import Decimal

# Setup paths
pwd = os.getcwd()
sys.path.append(pwd)
sys.path.append(os.path.join(pwd, 'apps'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
django.setup()

from django.contrib.auth import get_user_model
from apps.tests.models import Test
from apps.questions.models import Question

User = get_user_model()

def seed_all():
    print("Starting master seeding...")
    
    # 1. Users
    admin_username = 'admin'
    admin_user, created = User.objects.get_or_create(
        username=admin_username,
        defaults={
            'email': 'admin@example.com',
            'role': 'admin',
            'is_staff': True,
            'is_superuser': True,
            'is_active': True
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print(f"Created superuser: {admin_username}")
    else:
        print(f"Superuser {admin_username} already exists")

    student_username = 'student'
    student_user, created = User.objects.get_or_create(
        username=student_username,
        defaults={
            'email': 'student@example.com',
            'role': 'student',
            'is_active': True
        }
    )
    if created:
        student_user.set_password('student123')
        student_user.save()
        print(f"Created student user: {student_username}")
    else:
        print(f"Student user {student_username} already exists")

    # 2. Main Test (100 questions)
    test_name = "IQ Test - Set 1"
    test, created = Test.objects.get_or_create(
        name=test_name,
        defaults={
            'description': "Comprehensive IQ evaluation with 100 questions. You have 30 minutes.",
            'duration_minutes': 30,
            'total_questions': 100,
            'price': 0.00,
            'is_free_sample': False,
            'is_active': True,
            'created_by': admin_user
        }
    )
    
    if test.questions.count() < 100:
        print(f"Populating questions for '{test_name}'...")
        # Import data from seed_questions if possible or paste essentials
        from scripts.seed_questions import seed_data
        seed_data()
    else:
        print(f"Test '{test_name}' already has {test.questions.count()} questions.")

    # 3. Sample Test
    sample_test_name = "General IQ Test - Basic"
    sample_test, created = Test.objects.get_or_create(
        name=sample_test_name,
        defaults={
            "description": "A basic IQ test to evaluate logical reasoning.",
            "duration_minutes": 30,
            "total_questions": 5,
            "price": 0.00,
            "is_free_sample": True,
            "created_by": admin_user
        }
    )
    
    if sample_test.questions.count() == 0:
        print(f"Populating questions for '{sample_test_name}'...")
        questions_data = [
            {
                "text": "Which number comes next in the series: 2, 6, 12, 20, 30, ...?",
                "options": [{"id": "a", "text": "40"}, {"id": "b", "text": "42"}, {"id": "c", "text": "44"}, {"id": "d", "text": "46"}],
                "correct": "b",
                "difficulty": "easy"
            },
            {
                "text": "Light is to Eye as Sound is to...?",
                "options": [{"id": "a", "text": "Ear"}, {"id": "b", "text": "Nose"}, {"id": "c", "text": "Hand"}, {"id": "d", "text": "Mouth"}],
                "correct": "a",
                "difficulty": "easy"
            },
            {
                "text": "If some A are B, and all B are C, then...?",
                "options": [{"id": "a", "text": "All A are C"}, {"id": "b", "text": "Some A are C"}, {"id": "c", "text": "No A are C"}, {"id": "d", "text": "None of the above"}],
                "correct": "b",
                "difficulty": "medium"
            },
            {
                "text": "Identify the odd one out.",
                "options": [{"id": "a", "text": "Dog"}, {"id": "b", "text": "Cat"}, {"id": "c", "text": "Tiger"}, {"id": "d", "text": "Snake"}],
                "correct": "d",
                "difficulty": "easy"
            },
            {
                "text": "Complete the analogy: Book : Page :: House : ?",
                "options": [{"id": "a", "text": "Door"}, {"id": "b", "text": "Window"}, {"id": "c", "text": "Brick"}, {"id": "d", "text": "Roof"}],
                "correct": "c",
                "difficulty": "medium"
            }
        ]
        for i, q_data in enumerate(questions_data):
            Question.objects.get_or_create(
                test=sample_test,
                question_text=q_data["text"],
                defaults={
                    "question_type": "mcq",
                    "options": q_data["options"],
                    "correct_answer": q_data["correct"],
                    "difficulty_level": q_data["difficulty"],
                    "order": i + 1
                }
            )
        print(f"Sample test '{sample_test_name}' seeded.")

    print("Master seeding complete!")

if __name__ == "__main__":
    seed_all()
