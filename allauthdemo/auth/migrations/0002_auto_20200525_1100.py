# Generated by Django 3.0.5 on 2020-05-25 10:00

import allauthdemo.auth.models
import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allauthdemo_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', allauthdemo.auth.models.MyUserManager()),
            ],
        ),
        migrations.AlterField(
            model_name='local_product',
            name='description',
            field=models.CharField(max_length=800, null=True),
        ),
        migrations.AlterField(
            model_name='local_product',
            name='images',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.URLField(max_length=400, null=True), blank=True, default=list, null=True, size=None),
        ),
        migrations.AlterField(
            model_name='local_product',
            name='primary_image',
            field=models.URLField(max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='location',
            name='description',
            field=models.CharField(max_length=800, null=True),
        ),
        migrations.AlterField(
            model_name='location',
            name='images',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.URLField(max_length=400, null=True), blank=True, default=list, null=True, size=None),
        ),
        migrations.AlterField(
            model_name='location',
            name='primary_image',
            field=models.URLField(max_length=400, null=True),
        ),
    ]
