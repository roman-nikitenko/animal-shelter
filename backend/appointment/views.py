from rest_framework import viewsets
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .models import Appointment
from .serializers import (
    AppointmentSerializer,
    AppointmentListSerializer,
    AppointmentDetailSerializer
)
from .permissions import IsAuthenticatedOrIsAdmin
from notification.tasks import succes_appoin_notification


class AppointmentViewSet(viewsets.ModelViewSet):
    """Users can make an appointment with an animal,
    see their appointments only, and retrieve details of each one.
    Admin can update and delete appointments"""
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = (IsAuthenticatedOrIsAdmin,)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

        pet = serializer.validated_data.get("pet", None)
        reservation_date = serializer.validated_data.get("time", None)
        notification_info = {
            "telegram_chat_id":user.telegram_chat_id,
            "user_email": user.email,
            "pet_name": pet.name,
            "reservation_date": str(reservation_date.date()),
            "reservation_time": str(reservation_date.time())

        }

        succes_appoin_notification.delay(notification_info)

    @staticmethod
    def _params_to_ints(qs):
        """Converts a list of string IDs to a list of integers"""
        return [int(str_id) for str_id in qs.split(",")]

    def get_queryset(self):
        user_id = self.request.query_params.get("user_id")

        if not self.request.user.is_staff:
            return self.queryset.filter(user_id=self.request.user.id)

        if user_id and self.request.user.is_staff:
            user_id = self._params_to_ints(user_id)
            self.queryset = self.queryset.filter(user_id__in=user_id)

        return self.queryset

    def get_serializer_class(self):
        if self.action == "list":
            return AppointmentListSerializer
        if self.action == "retrieve":
            return AppointmentDetailSerializer
        return self.serializer_class

    @extend_schema(
        # Extra parameters added to filter
        parameters=[
            OpenApiParameter(
                name="user_id",
                description="Filter appointments by user ids. For admin only."
                            "(ex. /?user_id=1,2)",
                type={"type": "list", "items": {"type": "number"}}
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
