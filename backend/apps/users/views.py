"""
Views for user authentication and management.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer, 
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
    UserCreateSerializer
)
from utils.device_tracking import get_client_ip

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom login view with device tracking.
    Checks if user can login from the device and updates device info.
    """
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        # Get device fingerprint from request
        device_fingerprint = request.data.get('device_fingerprint', '')
        
        # Get user (before authentication)
        username = request.data.get('username', '')
        
        try:
            user = User.objects.get(username=username)
            
            # Check if user can login from this device
            if not user.can_login_from_device(device_fingerprint):
                return Response({
                    'error': 'This ID is already logged in on another device. You cannot login using a different device with the same ID.'
                }, status=status.HTTP_403_FORBIDDEN)
        
        except User.DoesNotExist:
            # Let the parent class handle invalid credentials
            pass
        
        # Proceed with normal login
        response = super().post(request, *args, **kwargs)
        
        # If login successful, update device info
        if response.status_code == 200:
            try:
                user = User.objects.get(username=username)
                ip_address = get_client_ip(request)
                user.update_device_info(device_fingerprint, ip_address)
            except Exception as e:
                # Log error but don't fail the login
                print(f"Error updating device info: {e}")
        
        return response


class LogoutView(viewsets.ViewSet):
    """Logout view that blacklists the refresh token."""
    
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
        """Logout user and blacklist refresh token."""
        try:
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for user management.
    Only admins can create/delete users.
    Users can view/update their own profile.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        """Set permissions based on action."""
        if self.action in ['create', 'destroy', 'list']:
            permission_classes = [IsAdminUser]
        elif self.action in ['update', 'partial_update', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        """Use different serializer for create action."""
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
    
    def get_queryset(self):
        """Filter queryset based on user role."""
        user = self.request.user
        if user.is_admin:
            return User.objects.all()
        return User.objects.filter(id=user.id)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get current user profile."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def change_password(self, request):
        """Change user password."""
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            return Response({'detail': 'Password changed successfully.'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reset_password(self, request, pk=None):
        """Admin action to reset any user's password."""
        user = self.get_object()
        new_password = request.data.get('password')
        
        if not new_password:
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        user.set_password(new_password)
        user.save()
        return Response({'detail': f'Password for {user.username} has been reset successfully.'})

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reset_device(self, request, pk=None):
        """Admin action to reset a user's device fingerprint."""
        user = self.get_object()
        user.device_fingerprint = None
        user.save()
        return Response({'detail': f'Device fingerprint for {user.username} has been cleared.'})
