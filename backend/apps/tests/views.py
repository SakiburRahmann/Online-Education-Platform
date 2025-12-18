from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Test, TestSession
from .serializers import TestSerializer, TestSessionSerializer

class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.action == 'list':
             return Test.objects.filter(is_active=True)
        return super().get_queryset()

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def start_session(self, request, pk=None):
        test = self.get_object()
        # Check for active session
        active_session = TestSession.objects.filter(user=request.user, test=test, status='in_progress').first()
        if active_session:
            return Response(TestSessionSerializer(active_session).data)

        session = TestSession.objects.create(
            user=request.user,
            test=test,
            time_limit_seconds=test.duration_minutes * 60,
            status='in_progress'
        )
        return Response(TestSessionSerializer(session).data, status=status.HTTP_201_CREATED)

class TestSessionViewSet(viewsets.ModelViewSet):
    queryset = TestSession.objects.all()
    serializer_class = TestSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TestSession.objects.filter(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        session = self.get_object()
        if session.status != 'in_progress':
            return Response({"error": "Test already submitted or expired"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Optional: update answers one last time
        if 'answers' in request.data:
            session.answers = request.data['answers']

        session.submit_test() # This uses the model method we optimized
        return Response(TestSessionSerializer(session).data)
