from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.response import Response
from .models import Notification

User = get_user_model()


class NotificationSerializer(serializers.ModelSerializer):
    token_with_prefix = serializers.SerializerMethodField()

    def get_token_with_prefix(self, obj):
        return f"token: {obj.telegram_token}" if obj.telegram_token else ""

    class Meta:
        model = Notification
        fields = ("token_with_prefix",)
