from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import (
    CreateUserView, ManageUserView, UserLogoutAPIView
)

manage_user = ManageUserView.as_view(
        actions={
            "get": "retrieve",
            "put": "update",
            "patch": "partial_update",
            "delete": "destroy",
        }
)
upload_image = ManageUserView.as_view(actions={"post": "upload_image"})

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="create-user"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path("me/", manage_user, name="manage"),
    path("me/upload-image/", upload_image, name="upload-image")
]

app_name = "user"
