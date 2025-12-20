"""
URL patterns for user authentication.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView, LogoutView, UserViewSet, AdminDashboardViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'dashboard-stats', AdminDashboardViewSet, basename='dashboard-stats')

urlpatterns = [
    # JWT Authentication
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view({'post': 'logout'}), name='logout'),
    
    # Include router URLs
    path('', include(router.urls)),
]
