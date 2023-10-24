import tempfile
from PIL import Image

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from pets.models import Pet, PetType
from pets.serializers import PetListSerializer, PetDetailSerializer

PET_URL = reverse("pets:pet-list")


def sample_animal_type(**params):
    defaults = {
        "name": "animal"
    }
    defaults.update(params)
    return PetType.objects.create(**defaults)


def sample_pet(**params):
    defaults = {
        "name": "Sample",
        "gender": "Male",
        "age": 5,
        "size": "Small",
    }
    defaults.update(params)

    return Pet.objects.create(**defaults)


def detail_url(pet_id):
    return reverse("pets:pet-detail", args=[pet_id])


class UsersPetsApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def authorise(self):
        self.user = get_user_model().objects.create_user(
            "test@test.com",
            "testpassword",
        )
        self.client.force_authenticate(self.user)

    def test_auth_not_required(self):
        res = self.client.get(PET_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_pet_str_representation(self):
        animal_type = sample_animal_type(name="test_animal")
        pet = sample_pet(animal_type=animal_type)
        expected_str = f"{pet.name} {pet.animal_type}"
        self.assertEqual(str(pet), expected_str)

    def test_statistic_endpoint(self):
        url = reverse("pets:statistic")

        animal_type = sample_animal_type(name="pet1")

        pet_1 = sample_pet(animal_type=animal_type)
        pet_2 = sample_pet(animal_type=animal_type, is_adopted=True)
        pet_3 = sample_pet(animal_type=animal_type, is_adopted=True)
        pet_4 = sample_pet(animal_type=animal_type, is_adopted=True)

        adopted_pets = Pet.objects.filter(is_adopted=True)
        homeless_pets = Pet.objects.filter(is_adopted=False)

        serializer_1 = PetListSerializer(pet_1)
        serializer_2 = PetListSerializer(pet_2)
        serializer_3 = PetListSerializer(pet_3)
        serializer_4 = PetListSerializer(pet_4)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["num_pets_homeless"], homeless_pets.count())
        self.assertEqual(res.data["num_pets_adopted"], adopted_pets.count())
        self.assertNotIn(serializer_1.data, res.data["list_of_3_last_adopted_pets"])
        self.assertIn(serializer_2.data, res.data["list_of_3_last_adopted_pets"])
        self.assertIn(serializer_3.data, res.data["list_of_3_last_adopted_pets"])
        self.assertIn(serializer_4.data, res.data["list_of_3_last_adopted_pets"])

    def test_pet_list_filter_by_animal_type(self):
        animal_type1 = sample_animal_type(name="pet5")
        animal_type2 = sample_animal_type(name="pet6")

        pet_1 = sample_pet(animal_type=animal_type1)
        pet_2 = sample_pet(animal_type=animal_type2)
        pet_3 = sample_pet(animal_type=animal_type1)
        pet_4 = sample_pet(animal_type=animal_type2)

        serializer_1 = PetListSerializer(pet_1)
        serializer_2 = PetListSerializer(pet_2)
        serializer_3 = PetListSerializer(pet_3)
        serializer_4 = PetListSerializer(pet_4)

        res = self.client.get(PET_URL, {"animal_type": f"{animal_type1}"})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn(serializer_1.data, res.data)
        self.assertNotIn(serializer_2.data, res.data)
        self.assertIn(serializer_3.data, res.data)
        self.assertNotIn(serializer_4.data, res.data)

    def test_pet_list_filter_by_color(self):
        animal_type = sample_animal_type(name="pet7")

        pet_1 = sample_pet(animal_type=animal_type, color="black, white")
        pet_2 = sample_pet(animal_type=animal_type, color="red")
        pet_3 = sample_pet(animal_type=animal_type, color="red, black")
        pet_4 = sample_pet(animal_type=animal_type, color="white")

        serializer_1 = PetListSerializer(pet_1)
        serializer_2 = PetListSerializer(pet_2)
        serializer_3 = PetListSerializer(pet_3)
        serializer_4 = PetListSerializer(pet_4)

        res = self.client.get(PET_URL, {"color": "black"})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn(serializer_1.data, res.data)
        self.assertNotIn(serializer_2.data, res.data)
        self.assertIn(serializer_3.data, res.data)
        self.assertNotIn(serializer_4.data, res.data)

    def test_pet_list_filter_by_gender(self):
        animal_type = sample_animal_type(name="pet8")

        pet_1 = sample_pet(animal_type=animal_type)
        pet_2 = sample_pet(animal_type=animal_type, gender="Female")
        pet_3 = sample_pet(animal_type=animal_type)
        pet_4 = sample_pet(animal_type=animal_type, gender="Female")

        serializer_1 = PetListSerializer(pet_1)
        serializer_2 = PetListSerializer(pet_2)
        serializer_3 = PetListSerializer(pet_3)
        serializer_4 = PetListSerializer(pet_4)

        res = self.client.get(PET_URL, {"gender": "Female"})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertNotIn(serializer_1.data, res.data)
        self.assertIn(serializer_2.data, res.data)
        self.assertNotIn(serializer_3.data, res.data)
        self.assertIn(serializer_4.data, res.data)

    def test_pet_list_filter_by_size(self):
        animal_type = sample_animal_type(name="pet9")

        pet_1 = sample_pet(animal_type=animal_type)
        pet_2 = sample_pet(animal_type=animal_type, size="Middle")
        pet_3 = sample_pet(animal_type=animal_type, size="Big")
        pet_4 = sample_pet(animal_type=animal_type, size="Big")

        serializer_1 = PetListSerializer(pet_1)
        serializer_2 = PetListSerializer(pet_2)
        serializer_3 = PetListSerializer(pet_3)
        serializer_4 = PetListSerializer(pet_4)

        res = self.client.get(PET_URL, {"size": "Big"})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertNotIn(serializer_1.data, res.data)
        self.assertNotIn(serializer_2.data, res.data)
        self.assertIn(serializer_3.data, res.data)
        self.assertIn(serializer_4.data, res.data)

    def test_list_pets(self):
        animal_type1 = sample_animal_type(name="test1")
        animal_type2 = sample_animal_type(name="test2")
        sample_pet(animal_type=animal_type1)
        sample_pet(animal_type=animal_type2)

        res = self.client.get(PET_URL)

        pets = Pet.objects.order_by("id")
        serializer = PetListSerializer(pets, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_pet_detail(self):
        animal_type = sample_animal_type(name="pet9")
        pet = sample_pet(animal_type=animal_type)

        url = detail_url(pet.id)
        serializer = PetDetailSerializer(pet)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_pet_unauthorised_users_forbidden(self):
        animal_type = sample_animal_type(name="test3")
        payload = {
            "name": "Test",
            "animal_type": animal_type,
            "gender": "Male",
            "age": 5,
            "size": "Small",
        }
        res = self.client.post(PET_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_pet_authorised_users_forbidden(self):
        self.authorise()

        animal_type = sample_animal_type(name="test4")
        payload = {
            "name": "Test",
            "animal_type": animal_type,
            "gender": "Male",
            "age": 5,
            "size": "Small",
        }
        res = self.client.post(PET_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_put_pet_authorised_users_not_allowed(self):
        self.authorise()

        animal_type1 = sample_animal_type(name="test4")
        animal_type2 = sample_animal_type(name="test5")
        payload = {
            "name": "Test",
            "animal_type": animal_type1,
            "gender": "Male",
            "age": 5,
            "size": "Small",
        }

        pet = sample_pet(animal_type=animal_type2)
        url = detail_url(pet.id)

        res = self.client.put(url, payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_put_pet_unauthorised_users_not_allowed(self):
        animal_type1 = sample_animal_type(name="test6")
        animal_type2 = sample_animal_type(name="test7")
        payload = {
            "name": "Test",
            "animal_type": animal_type1,
            "gender": "Male",
            "age": 5,
            "size": "Small",
        }

        pet = sample_pet(animal_type=animal_type2)
        url = detail_url(pet.id)

        res = self.client.put(url, payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_pet_authorised_users_not_allowed(self):
        self.authorise()

        animal_type = sample_animal_type(name="test8")
        pet = sample_pet(animal_type=animal_type)
        url = detail_url(pet.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_book_unauthorised_users_not_allowed(self):
        animal_type = sample_animal_type(name="test9")
        pet = sample_pet(animal_type=animal_type)
        url = detail_url(pet.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class AdminPetApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "admin@admin.com", "testpass", is_staff=True
        )
        self.client.force_authenticate(self.user)

    def test_adopted_endpoint(self):
        animal_type = sample_animal_type(name="animal1")
        pet = sample_pet(animal_type=animal_type)

        url = reverse("pets:pet-adopted", args=[pet.id])

        res = self.client.post(url)

        new_pet = Pet.objects.get(pk=pet.id)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(new_pet.is_adopted, True)

    def test_create_pet(self):
        animal_type = sample_animal_type(name="animal3")
        payload = {
            "name": "Sample",
            "animal_type": animal_type.id,
            "gender": "Male",
            "age": 5,
            "size": "Small",
        }
        res = self.client.post(PET_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        pet = Pet.objects.get(id=res.data["id"])
        for key in payload.keys():
            if key == "animal_type":
                payload[key] = PetType.objects.get(
                    id=payload[key]
                )
            self.assertEqual(payload[key], getattr(pet, key))

    def test_delete_pet(self):
        animal_type = sample_animal_type(name="test12")
        pet = sample_pet(animal_type=animal_type)
        url = detail_url(pet.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)


class PetImageUploadTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_superuser(
            "admin@myproject.com", "password"
        )
        self.client.force_authenticate(self.user)
        self.animal_type = sample_animal_type(name="test13")
        self.pet = sample_pet(animal_type=self.animal_type)

    def tearDown(self):
        self.pet.image.delete()

    def test_upload_image_to_movie(self):
        """Test uploading an image to movie"""
        animal_type = sample_animal_type(name="animal2")
        url = PET_URL
        with tempfile.NamedTemporaryFile(suffix=".jpg") as ntf:
            img = Image.new("RGB", (10, 10))
            img.save(ntf, format="JPEG")
            ntf.seek(0)
            image_file = SimpleUploadedFile(
                "test_image.jpg", ntf.read(), content_type="image/jpeg"
            )
            payload = {
                "name": "Sample",
                "animal_type": animal_type.id,
                "gender": "Male",
                "age": 5,
                "size": "Small",
                "image": image_file
            }
            response = self.client.post(url, payload, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        pet_id = response.data.get('id')
        pet = Pet.objects.get(id=pet_id)
        self.assertTrue(pet.image)

    def test_upload_image_bad_request(self):
        """Test uploading an invalid image"""
        animal_type = sample_animal_type(name="animal4")
        url = PET_URL
        payload = {
            "name": "Sample",
            "animal_type": animal_type.id,
            "gender": "Male",
            "age": 5,
            "size": "Small",
            "image": "not image"
        }
        res = self.client.post(url, payload, format="multipart")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_image_url_is_shown_on_pet_detail(self):
        animal_type = sample_animal_type(name="animal5")
        url = PET_URL
        with tempfile.NamedTemporaryFile(suffix=".jpg") as ntf:
            img = Image.new("RGB", (10, 10))
            img.save(ntf, format="JPEG")
            ntf.seek(0)
            image_file = SimpleUploadedFile(
                "test_image.jpg", ntf.read(), content_type="image/jpeg"
            )
            payload = {
                "name": "Sample",
                "animal_type": animal_type.id,
                "gender": "Male",
                "age": 5,
                "size": "Small",
                "image": image_file
            }
            self.client.post(url, payload, format='multipart')

        res = self.client.get(detail_url(self.pet.id))

        self.assertIn("image", res.data)

    def test_image_url_is_shown_on_pet_list(self):
        animal_type = sample_animal_type(name="animal6")
        url = PET_URL
        with tempfile.NamedTemporaryFile(suffix=".jpg") as ntf:
            img = Image.new("RGB", (10, 10))
            img.save(ntf, format="JPEG")
            ntf.seek(0)
            image_file = SimpleUploadedFile(
                "test_image.jpg", ntf.read(), content_type="image/jpeg"
            )
            payload = {
                "name": "Sample",
                "animal_type": animal_type.id,
                "gender": "Male",
                "age": 5,
                "size": "Small",
                "image": image_file
            }
            self.client.post(url, payload, format='multipart')

        res = self.client.get(PET_URL)

        self.assertIn("image", res.data[0].keys())
