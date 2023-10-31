from rest_framework import viewsets, status
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import Pet
from .serializers import PetSerializer, PetListSerializer, PetDetailSerializer
from .permissions import IsAdminOrReadOnly


@api_view(["GET"])
def statistic(request):

    """It shows the number of pets that are currently in the shelter,
    the number of pets that have been adopted and the list of the last three
    adopted pets"""

    num_pets_homeless = Pet.objects.filter(is_adopted=False).count()
    num_pets_adopted = Pet.objects.filter(is_adopted=True).count()

    list_of_3_last_adopted_pets = Pet.objects.select_related(
        "animal_type"
    ).filter(is_adopted=True).order_by("-id")[:6]
    serializer = PetListSerializer(list_of_3_last_adopted_pets, many=True)

    context = {
        "statistic":
            [
                {
                    "name": "Number of pets in our shelter",
                    "result": num_pets_homeless
                },
                {
                    "name": "Number of pets adopted",
                    "result": num_pets_adopted
                },
                {
                    "name": "Average time to find a family for a pet",
                    "result": 5
                },
                {
                    "name": "Percentage of pets that have found "
                            "a home in the last month",
                    "result": 85
                },
            ],
        "list_of_last_adopted_pets": serializer.data
    }

    return Response(context, status=status.HTTP_200_OK)


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.select_related("animal_type")
    serializer_class = PetSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def get_serializer_class(self):
        if self.action == "list":
            return PetListSerializer
        if self.action == "retrieve":
            return PetDetailSerializer
        return self.serializer_class

    def get_queryset(self):
        if self.action == "list":
            self.queryset = self.queryset.filter(is_adopted=False)

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


@api_view(["POST"])
@permission_classes([IsAdminOrReadOnly])
def adopted(request, pk):

    """This is supposed to be a button, that changes
    the specific animal's status to adopted"""

    pet = get_object_or_404(Pet, pk=pk)

    if not pet.is_adopted:
        pet.is_adopted = True
        pet.save()
        return Response(
            {"message": f"{pet.name} is successfully adopted!"},
            status=status.HTTP_200_OK
        )
