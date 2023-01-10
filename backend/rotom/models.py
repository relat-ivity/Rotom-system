from django.db import models

# Create your models here.
class SceneInfo(models.Model):
    title = models.CharField(max_length=10)
    content = models.CharField(max_length=20)
    user = models.CharField(max_length=15)
    scene_pic = models.TextField(default="")

class DeviceInfo(models.Model):
    title = models.CharField(max_length=10)
    content = models.CharField(max_length=10)
    cata = models.CharField(max_length=10)
    value1 = models.DecimalField(max_digits=4, decimal_places=0)
    value2 = models.DecimalField(max_digits=4, decimal_places=0)
    user = models.CharField(max_length=15)
    scene = models.CharField(max_length=10)

class user(models.Model):
    username = models.CharField(max_length=16, primary_key=True)
    password = models.CharField(max_length=16)
    phonenumber = models.CharField(max_length=12)