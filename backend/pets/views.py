from rest_framework import viewsets

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
