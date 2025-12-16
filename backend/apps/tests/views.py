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
        # Check if user already has an active session?
        # For now, just create a new one
        session = TestSession.objects.create(
            user=request.user,
            test=test,
            start_time=timezone.now(),
            status='started' # Assuming status field exists or logic handled in model
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
        if session.status == 'completed':
            return Response({"error": "Test already submitted"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Logic to calculate score would go here
        session.end_time = timezone.now()
        session.status = 'completed'
        session.save()
        return Response(TestSessionSerializer(session).data)
