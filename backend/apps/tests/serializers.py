from rest_framework import serializers
from .models import Test, TestSession

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['id', 'title', 'description', 'duration_minutes', 'total_questions', 'is_free', 'price', 'created_at']

class TestSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSession
        fields = ['id', 'test', 'user', 'start_time', 'end_time', 'score', 'status', 'answers']
        read_only_fields = ['user', 'start_time', 'end_time', 'score', 'status']
