# Generated by Django 4.1.2 on 2023-01-10 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DeviceInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=10)),
                ('content', models.CharField(max_length=10)),
                ('cata', models.CharField(max_length=10)),
                ('value1', models.DecimalField(decimal_places=0, max_digits=4)),
                ('value2', models.DecimalField(decimal_places=0, max_digits=4)),
                ('user', models.CharField(max_length=15)),
                ('scene', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='SceneInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=10)),
                ('content', models.CharField(max_length=20)),
                ('user', models.CharField(max_length=15)),
                ('scene_pic', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='user',
            fields=[
                ('username', models.CharField(max_length=16, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=16)),
                ('phonenumber', models.CharField(max_length=12)),
            ],
        ),
    ]
