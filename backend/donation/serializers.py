from rest_framework import serializers

from .models import Donation
from user.serializers import UserSerializer


class DonationListSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Donation
        fields = (
            "id",
            "date",
            "status",
            "user_id"
        )


class DonationDetailSerializer(DonationListSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Donation
        fields = (
            "id",
            "date",
            "status",
            "user",
            "session_url",
            "session_id",
        )
