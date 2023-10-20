from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from pets.serializers import PetListSerializer
from user.serializers import UserSerializer
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        data = super(AppointmentSerializer, self).validate(attrs=attrs)
        Appointment.validate_time(
            attrs["time"],
            ValidationError
        )
        return data

    class Meta:
        model = Appointment
        fields = ("id", "time", "pet_id")


class AppointmentListSerializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(format="%Y-%m-%d %H:%M")
    pet = serializers.SlugRelatedField(slug_field="name", read_only=True)
    user = serializers.SlugRelatedField(slug_field="full_name", read_only=True)

    class Meta:
        model = Appointment
        fields = ("id", "time", "pet", "user")


class AppointmentDetailSerializer(AppointmentListSerializer):
    time = serializers.DateTimeField(format="%Y-%m-%d %H:%M")
    pet = PetListSerializer(read_only=True)
    user = UserSerializer(read_only=True)
