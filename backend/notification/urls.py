from django.urls import path
from rest_framework import routers
from .views import NotificationViewset, TelegramWebhook

urlpatterns = [
    path(
        "telegram-token/", NotificationViewset.as_view({"get": "get_telegram_token"}),
        name="telegram-token"
         ),
    path("telegram/webhook/", TelegramWebhook.as_view(), name="telegram-webhook")
]

app_name = "notification"
