from django.urls import path
from .views import NotificationViewSet, TelegramWebhook

urlpatterns = [
    path(
        "telegram-token/",
        NotificationViewSet.as_view({"get": "get_telegram_token"}),
        name="telegram-token",
    ),
    path("telegram/webhook/", TelegramWebhook.as_view(), name="telegram-webhook"),
]

app_name = "notification"
