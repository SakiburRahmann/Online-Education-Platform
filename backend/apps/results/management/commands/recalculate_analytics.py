from django.core.management.base import BaseCommand
from apps.results.models import Result, PerformanceAnalytics
from django.contrib.auth import get_user_model
from django.db.models import Sum, Avg, Max, Min, Count

User = get_user_model()

class Command(BaseCommand):
    help = 'Recalculates performance analytics for all users'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting analytics recalculation...")
        
        # Get all users who have taken tests
        users_with_results = User.objects.filter(results__isnull=False).distinct()
        
        count = 0
        for user in users_with_results:
            self.stdout.write(f"Processing user: {user.username}")
            
            # Delete existing analytics
            PerformanceAnalytics.objects.filter(user=user).delete()
            
            # Get all results for this user
            results = Result.objects.filter(user=user)
            total_tests = results.count()
            
            if total_tests == 0:
                continue
                
            # Aggregate data
            passed_tests = results.filter(passed=True).count()
            
            # Calculate averages and totals
            avg_score = results.aggregate(Avg('score_percentage'))['score_percentage__avg'] or 0
            
            # Calculate average accuracy (handle nulls if any)
            # We first need to ensure accuracy is calculated for old records if missing
            # But simpler to just re-save them or calculate here.
            # Since we just added the field, it defaults to 0. We should calculate it on the fly for old records.
            
            total_time = results.aggregate(Sum('time_taken_seconds'))['time_taken_seconds__sum'] or 0
            avg_time = total_time // total_tests
            
            highest = results.aggregate(Max('score_percentage'))['score_percentage__max'] or 0
            lowest = results.aggregate(Min('score_percentage'))['score_percentage__min'] or 0
            
            # Calculate avg accuracy manually to be safe for old records
            total_accuracy = 0
            for res in results:
                # Recalculate accuracy for the result if it's 0 (migration default) 
                # correctness check: if score > 0 but accuracy is 0, it needs update.
                if res.accuracy == 0 and res.total_questions > 0:
                     # We might need to fetch session to get precise accuracy if "unanswered" matters
                     # But Result model has correct/wrong/unanswered fields now (or did it?)
                     # Let's check Result model fields again.
                     # correct_answers, wrong_answers.
                     answered_count = res.correct_answers + res.wrong_answers
                     if answered_count > 0:
                         from decimal import Decimal
                         res.accuracy = Decimal((res.correct_answers / answered_count) * 100)
                         res.save() # Persist the fix to Result
                
                total_accuracy += res.accuracy
            
            avg_accuracy = total_accuracy / total_tests if total_tests > 0 else 0
            
            # Create new analytics
            analytics = PerformanceAnalytics.objects.create(
                user=user,
                total_tests_taken=total_tests,
                total_tests_passed=passed_tests,
                average_score=avg_score,
                average_accuracy=avg_accuracy,
                highest_score=highest,
                lowest_score=lowest,
                total_time_spent=total_time,
                average_time_taken=avg_time
            )
            
            count += 1
            
        self.stdout.write(self.style.SUCCESS(f"Successfully recalculated analytics for {count} users"))
