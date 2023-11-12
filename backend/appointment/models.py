from datetime import datetime, timedelta

from django.conf import settings
from django.db import models
from django.db.models import Q
from django.utils import timezone

from pets.models import Pet


class Appointment(models.Model):
    time = models.DateTimeField()
    pet = models.ForeignKey(
        Pet, related_name="pets", on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="users",
        on_delete=models.CASCADE
    )

    @staticmethod
    def validate_time(time, pet, error_to_raise):
        conflicting_appointment = Appointment.objects.filter(
            Q(pet=pet, time__gte=(time - timedelta(hours=1))) &
            Q(pet=pet, time__lt=(time + timedelta(hours=1)))
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
