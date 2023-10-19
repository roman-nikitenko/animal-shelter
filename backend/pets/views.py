from rest_framework import viewsets
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .models import Pet
from .serializers import PetSerializer, PetListSerializer, PetDetailSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.select_related("animal_type")
    serializer_class = PetSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return PetListSerializer
        if self.action == "retrieve":
            return PetDetailSerializer
        return self.serializer_class

    def get_queryset(self):
        animal_type = self.request.query_params.get("animal_type")
        color = self.request.query_params.get("color")
        gender = self.request.query_params.get("gender")
        size = self.request.query_params.get("size")

        if animal_type:
            self.queryset = self.queryset.filter(
                animal_type__name__icontains=animal_type
            )

        if color:
            self.queryset = self.queryset.filter(color__icontains=color)

        if gender:
            self.queryset = self.queryset.filter(gender=gender)

        if size:
            self.queryset = self.queryset.filter(size__icontains=size)

        return self.queryset

    @extend_schema(
        # extra parameters added to the schema
        parameters=[
            OpenApiParameter(
                name="animal_type",
                type=OpenApiTypes.STR,
                description="Filter pets by "
                            "pet types (ex. ?animal_type=Dog)"
            ),
            OpenApiParameter(
                name="color",
                type=OpenApiTypes.STR,
                description="Filter pets by "
                            "color (ex. ?color=black)"
            ),
            OpenApiParameter(
                name="gender",
                type=OpenApiTypes.STR,
                description="Filter pets by "
                            "gender (ex. ?gender=Male or ?gender=Female)."
            ),
            OpenApiParameter(
                name="size",
                type=OpenApiTypes.STR,
                description="Filter pets by "
                            "size (ex. ?size=MIDDLE)"
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
