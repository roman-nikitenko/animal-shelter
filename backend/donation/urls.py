from django.urls import path

from .views import (
    HomePageView,
    stripe_config,
    create_stripe_session,
    success_donation,
    cancelled_donation,
    get_secret_key
)

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("key/", get_secret_key, name="secret-key"),
    path("config/", stripe_config, name="config"),
    path(
        "create-checkout-session/",
        create_stripe_session,
        name="create-checkout-session"
    ),
    path("success", success_donation, name="success-donation"),
    path("cancelled/", cancelled_donation, name="cancelled-donation")

]

app_name = "donation"
