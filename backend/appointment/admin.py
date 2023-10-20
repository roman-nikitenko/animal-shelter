from django.contrib import admin

from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("time", "pet_id", "user_id")
    list_filter = ("pet_id",)
    search_fields = ("user_id",)
