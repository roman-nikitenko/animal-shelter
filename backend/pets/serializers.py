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
            "story"
        )


class PetListSerializer(PetSerializer):

    class Meta:
        model = Pet
        fields = (
            "id",
            "name",
            "gender",
            "age",
            "breed",
        )


class PetDetailSerializer(serializers.ModelSerializer):
    animal_type = serializers.SlugRelatedField(slug_field="name", read_only=True)

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
            "story"
        )
