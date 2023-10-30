from django.urls import path
from rest_framework import routers

from .views import PetViewSet, statistic, adopted

router = routers.DefaultRouter()
router.register("", PetViewSet)

urlpatterns = [
    path("statistic/", statistic, name="statistic"),
    path("<int:pk>/adopted/", adopted, name="pet-adopted"),
] + router.urls

app_name = "pets"
