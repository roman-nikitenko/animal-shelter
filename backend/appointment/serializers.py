from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404

from pets.serializers import PetListSerializer
from user.serializers import UserSerializer
from .models import Appointment
from pets.models import Pet


class AppointmentSerializer(serializers.ModelSerializer):

    pet_id = serializers.IntegerField()

    def validate(self, attrs):
        data = super(AppointmentSerializer, self).validate(attrs=attrs)
        pet = get_object_or_404(Pet, pk=attrs["pet_id"])
        Appointment.validate_time(
            attrs["time"],
            pet,
            ValidationError
        )
        return data

    class Meta:
        model = Appointment
        fields = ("id", "time", "pet_id")

    def create(self, validated_data):
        pet_id = validated_data.get("pet_id", None)
        time = validated_data.get("time", None)
        user = validated_data.get("user", None)

        if pet_id:
            pet = get_object_or_404(Pet, id=pet_id)
            return Appointment.objects.create(
                time=time,
                pet=pet,
                user=user
            )
        else:
            raise ValidationError("You must write the pet id"
                                  " to make an appointment")


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
