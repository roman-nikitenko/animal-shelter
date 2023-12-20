from django.urls import path

from .views import (
    HomePageView,
    stripe_config,
    create_stripe_session,
    SuccessPageView,
    CancelPageView,
)

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("config/", stripe_config, name="config"),
    path(
        "create-checkout-session/",
        create_stripe_session,
        name="create-checkout-session"
    ),
    path("success", SuccessPageView.as_view(), name="success-donation"),
    path("cancelled/", CancelPageView.as_view(), name="cancelled-donation")

]

app_name = "donation"
