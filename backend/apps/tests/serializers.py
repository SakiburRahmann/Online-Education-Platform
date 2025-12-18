from rest_framework import serializers
from .models import Test, TestSession

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['id', 'name', 'description', 'duration_minutes', 'total_questions', 'is_free', 'price', 'created_at']

class TestSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSession
        fields = ['id', 'test', 'user', 'started_at', 'submitted_at', 'status', 'score', 'percentage', 'passed', 'answers']
        read_only_fields = ['user', 'started_at', 'submitted_at', 'score', 'percentage', 'passed', 'status']
