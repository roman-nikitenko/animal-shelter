import os
import uuid

from django.db import models
from django.utils.text import slugify
from storages.backends.gcloud import GoogleCloudStorage


storage = GoogleCloudStorage()


class GoogleImageField(models.ImageField):
    def upload_to(self, instance, filename):

        _, extension = os.path.splitext(filename)
        filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"
        path = storage.save(filename)
        return storage.url(path)
