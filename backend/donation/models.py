from django.db import models
from rest_framework.generics import get_object_or_404

from user.models import User


class Donation(models.Model):
    STATUS_CHOICE = [
        ("PENDING", "Pending"),
        ("PAID", "Paid"),
        ("EXPIRED", "Expired")
    ]

    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=7, choices=STATUS_CHOICE)
    user_id = models.IntegerField()
    session_url = models.URLField(max_length=500)
    session_id = models.CharField(max_length=255)

    @property
    def user(self) -> User:
        return get_object_or_404(User, pk=self.user_id)


class StripeSession(models.Model):
    session_id = models.CharField(max_length=255)
    payment_id = models.IntegerField()
    user_id = models.IntegerField()
    expiration_time = models.DateTimeField()
    is_expired = models.BooleanField(default=False)
