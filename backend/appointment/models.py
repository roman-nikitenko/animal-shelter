from datetime import datetime

from django.db import models
from rest_framework.generics import get_object_or_404

from pets.models import Pet


class Appointment(models.Model):
    time = models.DateTimeField()
    pet_id = models.IntegerField()
    user_id = models.IntegerField()

    @property
    def pet(self) -> Pet:
        return get_object_or_404(Pet, pk=self.pet_id)

    @staticmethod
    def validate_time(time, error_to_raise):
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
