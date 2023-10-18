from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Pet, PetType


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "animal_type", "gender", "age")
    list_filter = ("animal_type", )
    search_fields = ("id", "name")


admin.site.register(PetType)
admin.site.unregister(Group)
