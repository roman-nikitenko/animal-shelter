from datetime import datetime, timedelta

from django.db import models
from django.db.models import Q
from django.utils import timezone
from rest_framework.generics import get_object_or_404

from pets.models import Pet
from user.models import User


class Appointment(models.Model):
    time = models.DateTimeField()
    pet_id = models.IntegerField()
    user_id = models.IntegerField()

    @property
    def pet(self) -> Pet:
        return get_object_or_404(Pet, pk=self.pet_id)

    @property
    def user(self) -> User:
        return get_object_or_404(User, pk=self.user_id)

    @staticmethod
    def validate_time(time, pet_id, error_to_raise):
        conflicting_appointment = Appointment.objects.filter(
            Q(pet_id=pet_id, time__gte=(time - timedelta(hours=1))) &
            Q(pet_id=pet_id, time__lt=(time + timedelta(hours=1)))
        )

        min_appointment_time = timezone.now() + timedelta(hours=2)

        if time.weekday() > 4:
            raise error_to_raise(
                "Appointments can only be scheduled on workdays."
            )
        if (
                time.time() < datetime.strptime("09:00", "%H:%M").time()
                or time.time() > datetime.strptime("18:00", "%H:%M").time()
        ):
            raise error_to_raise(
                "Appointments are only allowed between 9:00 and 18:00."
            )
        if time < min_appointment_time:
            raise error_to_raise(
                "Appointments must be scheduled at least 2 hours ahead."
            )
        if conflicting_appointment.exists():
            raise error_to_raise(
                "The appointment at this time already exists"
            )
