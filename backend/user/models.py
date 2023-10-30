import io
import re
import os

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.utils.text import slugify
import uuid

from django.contrib.auth.models import (
    AbstractUser,
    BaseUserManager,
)
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models
from django.utils.translation import gettext as _
from PIL import Image
from pets.google_image_field import GoogleImageField


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with
        the given email and password."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser
        with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


def user_image_file_path(instance, filename: str):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.email)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads", "users", filename)


class User(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    phone_number = PhoneNumberField(blank=True)
    profile_picture = GoogleImageField(
        upload_to=user_image_file_path, blank=True, null=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    telegram_chat_id = models.BigIntegerField(
        unique=True, blank=True, null=True
    )

    objects = UserManager()

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    @staticmethod
    def validate_phone_number(phone_number, error_to_raise):
        if len(phone_number) != 13:
            raise error_to_raise(
                "Your phone number must have at least 13 numbers"
            )
        if not phone_number.startswith("+380"):
            raise error_to_raise(
                "Your phone number must be started with '+380'"
            )

    @staticmethod
    def validate_password(password, error_to_raise):
        if len(password) < 8:
            raise error_to_raise("Password must have at least 8 symbols")
        elif re.search("[0-9]", password) is None:
            raise error_to_raise("Password must contain at least 1 digit")
        elif re.search("[a-zA-Z]", password) is None:
            raise error_to_raise("Password must contain at lest 1 letter")

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.profile_picture:
            # Resize and save the profile picture to a reasonable size
            img_path = Image.open(self.profile_picture.name)
            img = default_storage.open(img_path)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                in_mem_file = io.BytesIO()
                img.save(in_mem_file, format=img.format)
                in_mem_file.seek(0)
                self.profile_picture.save(img_path, ContentFile(in_mem_file.read()), save=False)
