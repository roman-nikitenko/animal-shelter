from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "animal_shelter.settings")

app = Celery("animal_shelter")

app.config_from_object("django.conf:settings", namespace="CELERY")

# Автоматично відкривайте і закривайте з'єднання Redis.
app.conf.broker_transport_options = {'visibility_timeout': 3600}

app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print("Request: {0!r}".format(self.request))
