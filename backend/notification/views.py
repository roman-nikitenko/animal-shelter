from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer

from secrets import token_urlsafe

from django.http import JsonResponse
from .utils import handle_message


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=["GET"])
    def get_telegram_token(self, request):
        user = request.user
        notification = Notification.objects.get(user=user)
        if not notification:
            telegram_token = token_urlsafe(8)
            notification = Notification(user=user, telegram_token=telegram_token)
            notification.save()
        serializer = NotificationSerializer(notification, context={"request": request})
        return Response(serializer.data)


class TelegramWebhook(APIView):
    def post(self, request):
        # Run the asynchronous function in a separate thread
        message_data = request.data
        handle_message(message_data)
        return JsonResponse({"status": "ok"})
