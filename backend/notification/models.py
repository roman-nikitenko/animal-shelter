from django.db import models
from animal_shelter import settings


class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    telegram_token = models.CharField(max_length=20)

    def __str__(self):
        return self.user

