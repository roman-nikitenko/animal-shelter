# Generated by Django 4.2.6 on 2023-10-18 12:09

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("pets", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="pet",
            old_name="colour",
            new_name="color",
        ),
    ]
