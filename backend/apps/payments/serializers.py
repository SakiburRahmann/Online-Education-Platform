from rest_framework import serializers
from .models import Payment, UserTestAccess

class PaymentSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.full_name')
    
    class Meta:
        model = Payment
        fields = ['id', 'user', 'user_name', 'test', 'amount', 'transaction_id', 'status', 'payment_method', 'notes', 'verified_by', 'verified_at', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'status', 'verified_by', 'verified_at', 'created_at', 'updated_at']

class UserTestAccessSerializer(serializers.ModelSerializer):
    test_name = serializers.ReadOnlyField(source='test.name')
    
    class Meta:
        model = UserTestAccess
        fields = ['id', 'user', 'test', 'test_name', 'is_active', 'granted_at', 'times_attempted', 'last_attempted_at']
        read_only_fields = ['id', 'user', 'granted_at', 'times_attempted', 'last_attempted_at']
