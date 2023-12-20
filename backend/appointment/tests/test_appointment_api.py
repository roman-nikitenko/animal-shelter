import datetime

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.exceptions import ValidationError

from rest_framework.test import APIClient
from rest_framework import status

from pets.models import Pet, PetType
from appointment.models import Appointment
from appointment.serializers import (
    AppointmentListSerializer,
    AppointmentDetailSerializer
)

APPOINTMENT_URL = reverse("appointment:appointment-list")


def sample_pet(**params):
    defaults = {
        "name": "Sample",
        "gender": "Male",
        "age": 5,
        "size": "Small",
    }
    defaults.update(params)

    return Pet.objects.create(**defaults)


def sample_appointment(**params):
    defaults = {
        "time": timezone.now() + datetime.timedelta(hours=3),
    }
    defaults.update(params)
    
    return Appointment.objects.create(**defaults)


def detail_url(appointment_id):
    return reverse("appointment:appointment-detail", args=[appointment_id])


class UnauthenticatedAppointmentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        res = self.client.get(APPOINTMENT_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class AuthenticatedAppointmentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "test@test.com",
            "testpass",
        )
        self.animal_type = PetType.objects.create(name="animal1")
        self.pet = sample_pet(animal_type=self.animal_type)
        self.client.force_authenticate(self.user)

    def test_list_appointments(self):

        time = timezone.now() + datetime.timedelta(hours=6)

        sample_appointment(
            pet=self.pet, user=self.user
        )
        sample_appointment(
            pet=self.pet, time=time, user=self.user
        )

        res = self.client.get(APPOINTMENT_URL)

        appointments = Appointment.objects.order_by("id")
        serializer = AppointmentListSerializer(appointments, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_users_can_see_only_their_appointments(self):

        user2 = get_user_model().objects.create_user(
            "user1@user.com",
            "user1pass"
        )
        pet2 = sample_pet(animal_type=self.animal_type)
        pet3 = sample_pet(animal_type=self.animal_type)

        appointment1 = sample_appointment(
            pet=self.pet, user=self.user
        )
        appointment2 = sample_appointment(pet=pet2, user=user2)
        appointment3 = sample_appointment(pet=pet3, user=self.user)

        res = self.client.get(APPOINTMENT_URL)

        serializer1 = AppointmentListSerializer(appointment1)
        serializer2 = AppointmentListSerializer(appointment2)
        serializer3 = AppointmentListSerializer(appointment3)

        self.assertIn(serializer1.data, res.data)
        self.assertIn(serializer3.data, res.data)
        self.assertNotIn(serializer2.data, res.data)

    def test_retrieve_appointment_detail(self):

        appointment = sample_appointment(
            pet=self.pet, user=self.user
        )

        url = detail_url(appointment.id)
        res = self.client.get(url)

        serializer = AppointmentDetailSerializer(appointment)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_put_appointment_forbidden(self):

        appointment = sample_appointment(
            pet=self.pet, user=self.user
        )

        pet2 = sample_pet(animal_type=self.animal_type)

        payload = {
            "time": timezone.now() + datetime.timedelta(hours=4),
            "pet": pet2.id,
            "user": self.user.id
        }

        url = detail_url(appointment.id)
        res = self.client.put(url, payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_appointment_forbidden(self):

        appointment = sample_appointment(
            pet=self.pet, user=self.user
        )

        url = detail_url(appointment.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class AdminAppointmentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_superuser(
            "admin@admin.com", "testpass123"
        )
        self.animal_type = PetType.objects.create(name="animal5")
        self.client.force_authenticate(self.user)

    def test_filter_appointments_by_users(self):

        pet_1 = sample_pet(animal_type=self.animal_type)
        pet_2 = sample_pet(animal_type=self.animal_type)
        pet_3 = sample_pet(animal_type=self.animal_type)

        user_1 = get_user_model().objects.create_user(
            "user1@user.com",
            "user1pass"
        )
        user_2 = get_user_model().objects.create_user(
            "user2@user.com",
            "user2pass"
        )
        user_3 = get_user_model().objects.create_user(
            "user3@user.com",
            "user3pass"
        )

        appointment_1 = sample_appointment(user=user_1, pet=pet_1)
        appointment_2 = sample_appointment(user=user_2, pet=pet_2)
        appointment_3 = sample_appointment(user=user_3, pet=pet_3)

        res = self.client.get(
            APPOINTMENT_URL, {"user_id": f"{user_1.id}, {user_2.id}"}
        )

        serializer1 = AppointmentListSerializer(appointment_1)
        serializer2 = AppointmentListSerializer(appointment_2)
        serializer3 = AppointmentListSerializer(appointment_3)

        self.assertIn(serializer1.data, res.data)
        self.assertIn(serializer2.data, res.data)
        self.assertNotIn(serializer3.data, res.data)


class CreateAppointmentValidationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "test@test.com", "testpass123"
        )
        self.user_2 = get_user_model().objects.create_user(
            "user2@user.com",
            "user2pass"
        )
        self.animal_type = PetType.objects.create(name="animal2")
        self.pet = sample_pet(animal_type=self.animal_type)
        self.client.force_authenticate(self.user)

    def test_validate_conflicting_appointments_at_the_same_time(self):

        time = datetime.datetime(2025, 12, 12, 12, 0)

        sample_appointment(
            user=self.user, pet=self.pet, time=time
        )

        payload = {
            "time": time,
            "user": self.user_2.pk,
            "pet_id": self.pet.pk
        }

        res = self.client.post(APPOINTMENT_URL, payload)
        error = res.json()["non_field_errors"]

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            error[0],
            "The appointment at this time already exists"
        )

    def test_validate_conflicting_appointments_less_then_in_hour(self):

        time_1 = datetime.datetime(2025, 12, 12, 12, 0)
        time_2 = datetime.datetime(2025, 12, 12, 12, 59)

        sample_appointment(
            user=self.user, pet=self.pet, time=time_1
        )

        payload = {
            "time": time_2,
            "user": self.user_2.pk,
            "pet_id": self.pet.pk
        }

        res = self.client.post(APPOINTMENT_URL, payload)
        error = res.json()["non_field_errors"]

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            error[0],
            "The appointment at this time already exists"
        )

    def test_create_appointments_more_then_in_hour_is_success(self):
        time_1 = datetime.datetime(2025, 12, 12, 12, 0)
        time_2 = datetime.datetime(2025, 12, 12, 13, 1)

        sample_appointment(
            user=self.user, pet=self.pet, time=time_1
        )

        payload = {
            "time": time_2,
            "user": self.user_2.pk,
            "pet_id": self.pet.pk
        }

        res = self.client.post(APPOINTMENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_appointment_on_weekends_is_forbidden(self):

        time = datetime.datetime(2023, 10, 28, 12, 0)

        payload = {
            "time": time,
            "user": self.user.pk,
            "pet_id": self.pet.pk
        }

        res = self.client.post(APPOINTMENT_URL, payload)
        error = res.json()["non_field_errors"]

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            error[0],
            "Appointments can only be scheduled on workdays."
        )

    def test_create_appointment_before_9_oclock_is_forbidden(self):

        time = datetime.datetime(2023, 12, 12, 8, 59)

        payload = {
            "time": time,
            "user": self.user.pk,
            "pet_id": self.pet.pk
        }

        res = self.client.post(APPOINTMENT_URL, payload)
        error = res.json()["non_field_errors"]

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            error[0],
            "Appointments are only allowed between 9:00 and 18:00."
        )

    def test_create_appointment_after_18_oclock_is_forbidden(self):

        time = datetime.datetime(2023, 12, 12, 18, 1)

        payload = {
            "time": time,
            "user": self.user.pk,
            "pet_id": self.pet.pk
        }

        res = self.client.post(APPOINTMENT_URL, payload)
        error = res.json()["non_field_errors"]

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            error[0],
            "Appointments are only allowed between 9:00 and 18:00."
        )

    def test_create_appointment_from_now_for_two_hours_forbidden(self):

        time = (
                timezone.now()
                + datetime.timedelta(hours=1, minutes=59)
        )

        payload = {
            "time": time,
            "user": self.user.pk,
            "pet_id": self.pet.pk
        }

        res = self.client.post(APPOINTMENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertRaisesMessage(
            ValidationError,
            "Appointments must be scheduled at least 2 hours ahead."
        )
