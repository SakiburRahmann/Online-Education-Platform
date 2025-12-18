from rest_framework import viewsets, permissions
from .models import Question
from .serializers import QuestionSerializer, AdminQuestionSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_serializer_class(self):
        if self.request.user.is_staff or self.request.user.is_superuser:
            return AdminQuestionSerializer
        return QuestionSerializer

    def get_queryset(self):
        queryset = Question.objects.all()
        test_id = self.request.query_params.get('test_id', None)
        if test_id is not None:
            queryset = queryset.filter(test_id=test_id)
        
        # Admin sees all, regular users only see questions for active tests?
        # Ideally, questions should only be accessed via a secure test session endpoint to prevent scraping,
        # but for MVP filtering by test_id is okay if test is visible.
        return queryset.order_by('order', 'created_at')
