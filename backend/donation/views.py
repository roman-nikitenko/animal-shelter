import os
import stripe
from django.conf import settings
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.views.generic.base import TemplateView


class HomePageView(TemplateView):
    template_name = "home.html"


class SuccessPageView(TemplateView):
    template_name = "donations/success.html"


class CancelPageView(TemplateView):
    template_name = "donations/cancel.html"


@csrf_exempt
@api_view(["GET"])
def stripe_config(request):
    if request.method == "GET":
        stripe_config = {"publicKey": settings.STRIPE_PUBLISHABLE_KEY}
        return JsonResponse(stripe_config, safe=False)


@csrf_exempt
@api_view(["GET"])
def create_stripe_session(request):
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        submit_type="donate",
        line_items=[
            {
                "price_data": {
                    "currency": "uah",
                    'product_data': {
                        "name": "Donation",
                        "description": "Make a meaningful contribution "
                                       "to our cause! Your donation will "
                                       "directly support our ongoing efforts "
                                       "to provide shelter, care, and a loving "
                                       "environment for animals in need. "
                                       "Every contribution, no matter how small, "
                                       "makes a significant difference in the lives "
                                       "of these animals. Together, we can create a "
                                       "brighter future for our furry friends.",
                        "images": [
                            "https://storage.googleapis.com/"
                            "images_for_pets_bucket/pets.png"
                        ]
                    },
                    "unit_amount": 20000,
                },
                "quantity": 1,
            },
        ],
        mode="payment",
        success_url=request.build_absolute_uri(
            (reverse("donation:success-donation"))
            + f"?session_id={{CHECKOUT_SESSION_ID}}"
        ),
        cancel_url=request.build_absolute_uri(
            reverse("donation:cancelled-donation")
        )
    )

    return JsonResponse({"sessionId": session["id"]})
