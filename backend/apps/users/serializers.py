"""
Serializers for user authentication and management.
"""
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'full_name', 'phone', 'role', 
                  'is_active', 'created_at', 'updated_at', 'last_login')
        read_only_fields = ('id', 'created_at', 'updated_at', 'last_login')


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT token serializer with user information and device tracking."""
    
    device_fingerprint = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        # Get device fingerprint from request
        device_fingerprint = attrs.pop('device_fingerprint', None)
        
        # Get the token
        data = super().validate(attrs)
        
        # Add custom claims
        data['user'] = UserSerializer(self.user).data
        
        # Store device fingerprint in request for middleware
        self.context['request'].device_fingerprint = device_fingerprint
        
        return data


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for password change."""
    
    old_password = serializers.CharField(required=True, write_only=True)
    new_password =serializers.CharField(required=True, write_only=True, validators=[validate_password])
    
    def validate_old_password(self, value):
        """Verify old password."""
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new users (admin only)."""
    
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'full_name', 'phone', 'role', 'is_active')
    
    def create(self, validated_data):
        """Create user with hashed password."""
        user = User.objects.create_user(**validated_data)
        return user
