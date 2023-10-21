import os
import uuid

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.text import slugify


class PetType(models.Model):
    name = models.CharField(max_length=63, unique=True)

    def __str__(self) -> str:
        return self.name


def pet_image_file_path(instance, filename: str):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads", "posts", filename)


class Pet(models.Model):

    SIZE_CHOICES = [
        ("Big", "BIG"),
        ("Middle", "MIDDLE"),
        ("Small", "SMALL")
    ]
    GENDER_CHOICES = [
        ("Female", "FEMALE"),
        ("Male", "MALE")
    ]

    name = models.CharField(max_length=63)
    animal_type = models.ForeignKey(PetType, on_delete=models.CASCADE)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    age = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        validators=[
            MinValueValidator(limit_value=0),
            MaxValueValidator(limit_value=17)
        ])
    breed = models.CharField(max_length=63, default="mongrel")
    size = models.CharField(max_length=6, choices=SIZE_CHOICES)
    color = models.CharField(max_length=63, blank=True, null=True)
    story = models.TextField(blank=True, null=True)
    image = models.ImageField(null=True, upload_to=pet_image_file_path)
    is_adopted = models.BooleanField(default=False)
