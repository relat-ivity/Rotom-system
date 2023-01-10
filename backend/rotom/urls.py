from django.urls import path
from django.conf.urls import include
from . import views


app_name = 'rotom'

urlpatterns = [
    path('regin/', views.regin, name='regin'),
    path('login/', views.login, name='login'),
]