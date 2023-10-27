from rest_framework import serializers
from .models import Pet


class PetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pet
        fields = (
            "id",
            "name",
            "animal_type",
            "gender",
            "age",
            "breed",
            "size",
            "color",
            "story",
            "image"
        )


class PetListSerializer(PetSerializer):
    animal_type = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Pet
        fields = (
            "id",
            "name",
            "gender",
            "age",
            "breed",
            "image",
            "animal_type"
        )


class PetDetailSerializer(PetListSerializer):

    class Meta:
        model = Pet
        fields = (
            "id",
            "name",
            "animal_type",
            "gender",
            "age",
            "breed",
            "size",
            "color",
            "story",
            "image"
        )
