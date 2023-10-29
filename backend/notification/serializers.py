from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.response import Response
from .models import Notification

User = get_user_model()


class NotificationSerializer(serializers.ModelSerializer):
    telegram_token = serializers.CharField(read_only=True)

    class Meta:
        model = Notification
        fields = (
            "telegram_token",
        )
