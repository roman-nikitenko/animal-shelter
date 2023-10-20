from rest_framework import routers

from .views import AppointmentViewSet


router = routers.DefaultRouter()
router.register("", AppointmentViewSet)

urlpatterns = router.urls

app_name = "appointment"
