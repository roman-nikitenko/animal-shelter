from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class CreateUserSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        data = super(CreateUserSerializer, self).validate(attrs=attrs)
        get_user_model().validate_phone_number(
            attrs["phone_number"],
            ValidationError
        )
        get_user_model().validate_password(
            attrs["password"],
            ValidationError
        )
        return data

    class Meta:
        model = get_user_model()
        fields = (
            "email",
            "first_name",
            "last_name",
            "password",
            "phone_number",
            "profile_picture",
        )
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        data = super(UserSerializer, self).validate(attrs=attrs)
        get_user_model().validate_phone_number(
            attrs["phone_number"],
            ValidationError
        )
        get_user_model().validate_password(
            attrs["password"],
            ValidationError
        )
        return data

    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
            "is_staff")
        read_only_fields = ("is_staff",)
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def update(self, instance, validated_data):
        """Update a user, set the password correctly and return it"""
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()

        return user
