from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

from .serializers import UserSerializer, CreateUserSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken
from rest_framework.generics import GenericAPIView


class CreateUserView(generics.CreateAPIView):
    """Users can register"""
    serializer_class = CreateUserSerializer


class ManageUserView(generics.RetrieveUpdateDestroyAPIView):
    """Users can manage their accounts.
    Change their information and delete the account."""
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class UserLogoutAPIView(GenericAPIView):
    """
    An endpoint to logout users.
    """

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if self.request.data.get("all"):
            for token in OutstandingToken.objects.filter(user=request.user):
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response(
                {"status": "All refresh tokens blacklisted. "
                           "Logout successful"}
            )
        refresh_token = self.request.data.get("refresh_token")
        token = RefreshToken(token=refresh_token)
        token.blacklist()
        return Response({"status": "Logout successful"})
