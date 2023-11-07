import os
import stripe
from django.db import transaction
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import mixins, viewsets

from .models import Donation, StripeSession
from .serializers import DonationListSerializer, DonationDetailSerializer

stripe.api_key = os.getenv("STRIPE_API_KEY")


@csrf_exempt
def create_stripe_session(request):
    return stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="payment",
        line_items=[
            {
                "name": "Donation",
                "quantity": 1,
                "currency": "usd",
                "amount": "2000",
            },
        ],

        success_url=request.build_absolute_uri(
            reverse("payment:success-payment"
                    )) + f"?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=request.build_absolute_uri(
            reverse("payment:cancel-payment")
        )
    )


@csrf_exempt
def create_model_stripe_session(session, donation):
    expiration_time = timezone.now() + timezone.timedelta(minutes=2)
    StripeSession.objects.create(
        session_id=session.id,
        payment_id=donation.pk,
        user_id=donation.user_id,
        expiration_time=expiration_time
    )


@csrf_exempt
def create_payment(request):

    with transaction.atomic():
        session = create_stripe_session(request)

        payment = Donation.objects.create(
            status="PENDING",
            user_id=request.user.pk,
            session_url=session.url,
            session_id=session.id,
        )
        create_model_stripe_session(session, payment)

        return Response({"sessionId": session.id}, status=status.HTTP_200_OK)


class DonationViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Donation.objects.all()
    serializer_class = DonationListSerializer

    def get_serializer_class(self):
        if self.action == "retrieve":
            return DonationDetailSerializer
