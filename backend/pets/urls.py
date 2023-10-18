from django import urls
from rest_framework import routers

from .views import PetViewSet

router = routers.DefaultRouter()
router.register("", PetViewSet)

urlpatterns = router.urls

app_name = "pets"
