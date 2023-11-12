import tempfile
from PIL import Image
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from rest_framework.exceptions import ValidationError

from rest_framework.test import APIClient
from rest_framework import status
from user.serializers import UserSerializer


CREATE_USER_URL = reverse("user:create-user")
PROFILE_URL = reverse("user:manage")


def sample_payload(**params):
    payload = {
        "email": "user@user.com",
        "first_name": "User",
        "last_name": "Test",
        "password": "test12345",
        "phone_number": "+380987653496",
    }
    payload.update(**params)
    return payload


class UserRegisterApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_registration(self):
        payload = sample_payload()
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_user_with_password_less_then_8_symbols_forbidden(self):
        payload = sample_payload(password="us12345")
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertRaisesMessage(
            ValidationError, "Password must have at least 8 symbols"
        )

    def test_create_user_with_password_without_digits_forbidden(self):
        payload = sample_payload(password="useruser")
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertRaisesMessage(
            ValidationError, "Password must contain at least 1 digit"
        )

    def test_create_user_with_password_without_letters_forbidden(self):
        payload = sample_payload(password="12345678")
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertRaisesMessage(
            ValidationError, "Password must contain at lest 1 letter"
        )

    def test_create_user_with_phone_num_less_then_13_symbols_forbidden(self):
        payload = sample_payload(phone_number="+3809765432")
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertRaisesMessage(
            ValidationError, "Your phone number must have at least 13 numbers"
        )

    def test_create_user_with_phone_num_doesnt_start_with_380_forbidden(self):
        payload = sample_payload(phone_number="+267097654323")
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertRaisesMessage(
            ValidationError, "Your phone number must be started with '+380'"
        )


class AuthenticatedUserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "test@test.com", "password12345"
        )
        self.client.force_authenticate(self.user)

    def test_upload_profile_picture_at_the_users_cabinet(self):
        """Test uploading an image to user"""

        with tempfile.NamedTemporaryFile(suffix=".jpg") as ntf:
            img = Image.new("RGB", (10, 10))
            img.save(ntf, format="JPEG")
            ntf.seek(0)
            image_file = SimpleUploadedFile(
                "test_image.jpg", ntf.read(), content_type="image/jpeg"
            )
            payload = sample_payload(profile_picture=image_file)
            res = self.client.put(PROFILE_URL, payload, format="multipart")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        user_id = res.data.get("id")
        user = get_user_model().objects.get(id=user_id)
        self.assertTrue(user.profile_picture)

    def test_upload_profile_picture_bad_request(self):
        """Test uploading an invalid image"""

        payload = sample_payload(profile_picture="image")
        res = self.client.put(PROFILE_URL, payload, format="multipart")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_image_url_is_shown_on_user_detail(self):
        with tempfile.NamedTemporaryFile(suffix=".jpg") as ntf:
            img = Image.new("RGB", (10, 10))
            img.save(ntf, format="JPEG")
            ntf.seek(0)
            image_file = SimpleUploadedFile(
                "test_image.jpg", ntf.read(), content_type="image/jpeg"
            )
            payload = sample_payload(profile_picture=image_file)
            self.client.put(PROFILE_URL, payload, format="multipart")

        res = self.client.get(PROFILE_URL)

        self.assertIn("profile_picture", res.data)

    def test_resize_profile_picture(self):
        with tempfile.NamedTemporaryFile(suffix=".jpg") as ntf:
            img = Image.new("RGB", (400, 400))
            img.save(ntf, format="JPEG")
            ntf.seek(0)
            image_file = ContentFile(ntf.read(), name="test_image.jpg")
            self.user.profile_picture = image_file

            # Call the method that resizes the profile picture
            self.user.save()

        self.assertTrue(self.user.profile_picture.height == 300)
        self.assertTrue(self.user.profile_picture.width == 300)

    def test_user_logout(self):
        url = reverse("user:logout-user")
        res = self.client.post(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {"status": "Logout successful"})

    def test_retrieve_user_detail(self):
        res = self.client.get(PROFILE_URL)

        serializer = UserSerializer(self.user)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
