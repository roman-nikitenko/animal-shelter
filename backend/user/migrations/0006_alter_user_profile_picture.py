# Generated by Django 3.2.22 on 2023-10-30 13:37

from django.db import migrations
import pets.google_image_field
import user.models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_merge_20231030_0804'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=pets.google_image_field.GoogleImageField(blank=True, null=True, upload_to=user.models.user_image_file_path),
        ),
    ]