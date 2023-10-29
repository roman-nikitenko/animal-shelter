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
from telegram import Update
from telegram.ext import CallbackContext
from .utils import handle_telegram_update
from asgiref.sync import sync_to_async


class NotificationViewset(viewsets.ModelViewSet):
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
    @sync_to_async
    def post(self, request):
        handle_telegram_update(request)
        return JsonResponse({"status": "ok"})
