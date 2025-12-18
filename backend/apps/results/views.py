from rest_framework import viewsets, permissions
from .models import Result, PerformanceAnalytics
from .serializers import ResultSerializer, ResultDetailSerializer, PerformanceAnalyticsSerializer

class ResultViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ResultDetailSerializer
        return ResultSerializer

    def get_queryset(self):
        return Result.objects.filter(user=self.request.user)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        lookup_value = self.kwargs[lookup_url_kwarg]

        try:
            # Try by primary key first
            return queryset.get(pk=lookup_value)
        except (Result.DoesNotExist, ValueError):
            # If not found or invalid UUID for PK, try as session ID
            try:
                return queryset.get(test_session_id=lookup_value)
            except (Result.DoesNotExist, ValueError):
                from django.http import Http404
                raise Http404

class AnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PerformanceAnalytics.objects.all()
    serializer_class = PerformanceAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PerformanceAnalytics.objects.filter(user=self.request.user)
