from django.db import models


class PetType(models.Model):
    name = models.CharField(max_length=63, unique=True)

    def __str__(self) -> str:
        return self.name


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
    gender = models. CharField(max_length=6, choices=GENDER_CHOICES)
    age = models.IntegerField()
    breed = models.CharField(max_length=63, default="mongrel")
    size = models.CharField(max_length=6, choices=SIZE_CHOICES)
    color = models.CharField(max_length=63, blank=True, null=True)
    story = models.TextField(blank=True, null=True)
