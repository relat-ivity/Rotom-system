from django.urls import path
from django.conf.urls import include
from . import views


app_name = 'rotom'

urlpatterns = [
    path('regin/', views.regin, name='regin'),
    path('login/', views.login, name='login'),
    path('scene/', views.scene, name='scene'),
    path('addscene/', views.addscene, name='addscene'),
    path('deletescene/', views.deletescene, name='deletescene'),
    path('device/', views.device, name='device'),
    path('adddevice/', views.adddevice, name='device'),
    path('deletedevice/', views.deletedevice, name='deletedevice'),
    path('drawscene/', views.drawscene, name='drawscene'),
    path('scenepic/', views.scenepic, name='scenepic'),
    path('updatepic/', views.updatepic, name='updatepic'),

]