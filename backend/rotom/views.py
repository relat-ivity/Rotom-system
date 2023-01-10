import json

import pymysql
from django.http import JsonResponse, HttpResponseNotFound
from django.shortcuts import render, redirect
from django.shortcuts import HttpResponse
from rotom import models

DB_password="password"

# Create your views here.
def regin(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor=conn.cursor()
    username=request.GET.get('username')
    password=request.GET.get('password')
    phonenumber=request.GET.get('phonenumber')
    sql = 'select username from rotom_user ' \
          'where username=%s'
    cursor.execute(sql, username)
    result=cursor.fetchall()
    if len(result)!=0:
        return JsonResponse({"status":"0"})
    sql = 'select* from rotom_user'
    cursor.execute(sql)
    result = cursor.fetchall()
    user=models.user.objects.create(
        username = username,
        password = password,
        phonenumber = phonenumber
     )
    user.save()
    cursor.close()
    conn.close()
    return JsonResponse({"status":"1"})

def login(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    username = request.GET.get('username')
    password = request.GET.get('password')
    sql = "SELECT username,password FROM rotom_user " \
          "WHERE username= %s"
    cursor.execute(sql, username)
    result = cursor.fetchall()
    for i in range(0, len(result)):
        if (result[i][1] == password):
            return JsonResponse({"status":"1"})
    return JsonResponse({"status":"0"})