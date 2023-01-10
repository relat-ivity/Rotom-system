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
    sql = "select username,password from rotom_user " \
          "where username = %s"
    cursor.execute(sql, username)
    result = cursor.fetchall()
    for i in range(0, len(result)):
        if (result[i][1] == password):
            return JsonResponse({"status":"1"})
    return JsonResponse({"status":"0"})

def scene(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    user = request.GET.get('user')
    sql = "select title,content from rotom_sceneinfo " \
          "where user = %s "
    cursor.execute(sql, user)
    result = cursor.fetchall()
    if len(result) != 0:
        searchTable = []
        for i in range(0, len(result)):
            small_list = {
                "title": result[i][0],
                "content": result[i][1]
            }
            searchTable.append(small_list)
        data = {
            'scenelist': searchTable
        }
        result = JsonResponse(json.dumps(data), safe=False)
        return result
    cursor.close()
    conn.close()
    return JsonResponse(json.dumps({'scenelist':[]}),safe=False)

def addscene(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    title = request.GET.get('title')
    content = request.GET.get('content')
    user = request.GET.get('user')
    sql = 'select * from rotom_sceneinfo'
    cursor.execute(sql)
    result = cursor.fetchall()
    scene = models.SceneInfo.objects.create(
        title=title,
        content=content,
        user=user
    )
    scene.save()
    cursor.close()
    conn.close()
    return JsonResponse({"status": "1"})

def deletescene(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    title = request.GET.get('title')
    user = request.GET.get('user')
    sql = 'delete from rotom_sceneinfo where title='+"'"+title+"' and user='"+user+"'"
    try:
        cursor.execute(sql)
        result = cursor.fetchall()
        conn.commit()
        cursor.close()
        conn.close()
        return JsonResponse({"status": sql})
    except:
        cursor.close()
        conn.close()
        return JsonResponse({"status": "0"})

def device(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    user = request.GET.get('user')
    scene = request.GET.get('scene')
    sql = "select title,content, cata, value1, value2 from rotom_deviceinfo where user ='"+user+"' and scene='"+scene+"'"
    cursor.execute(sql)
    result = cursor.fetchall()
    if len(result) != 0:
        searchTable = []
        for i in range(0, len(result)):
            small_list = {
                "title": result[i][0],
                "content": result[i][1],
                "cata": result[i][2],
                "value1str": str(result[i][3]),
                "value2str": str(result[i][4]),
            }
            searchTable.append(small_list)
        data = {
            'devicelist': searchTable
        }
        result = JsonResponse(json.dumps(data), safe=False)
        return result
    cursor.close()
    conn.close()
    return JsonResponse(json.dumps({'devicelist':[]}),safe=False)

def adddevice(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    title = request.GET.get('title')
    content = request.GET.get('content')
    cata = request.GET.get('cata')
    value1 = request.GET.get('value1')
    value2 = request.GET.get('value2')
    user = request.GET.get('user')
    scene = request.GET.get('scene')
    sql = 'select * from rotom_deviceinfo'
    cursor.execute(sql)
    result = cursor.fetchall()
    device = models.DeviceInfo.objects.create(
        title=title,
        content=content,
        cata=cata,
        value1=value1,
        value2=value2,
        user=user,
        scene=scene
    )
    device.save()
    cursor.close()
    conn.close()
    return JsonResponse({"status": "1"})

def deletedevice(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    title = request.GET.get('title')
    user = request.GET.get('user')
    scene = request.GET.get('scene')
    sql = 'delete from rotom_deviceinfo where title='+"'"+title+"' and user='"+user+"' and scene='"+scene+"'"
    try:
        cursor.execute(sql)
        result = cursor.fetchall()
        conn.commit()
        cursor.close()
        conn.close()
        return JsonResponse({"status": sql})
    except:
        cursor.close()
        conn.close()
        return JsonResponse({"status": "0"})

def drawscene(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    user = request.GET.get('user')
    sql = "select title,scene_pic from rotom_sceneinfo " \
          "where user = %s "
    cursor.execute(sql, user)
    result = cursor.fetchall()
    if len(result) != 0:
        searchTable = []
        for i in range(0, len(result)):
            small_list = {
                "title": result[i][0],
                "pic": result[i][1]
            }
            searchTable.append(small_list)
        data = {
            'scenelist': searchTable
        }
        result = JsonResponse(json.dumps(data), safe=False)
        return result
    cursor.close()
    conn.close()
    return JsonResponse(json.dumps({'scenelist':[]}),safe=False)

def scenepic(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    user = request.GET.get('user')
    scene = request.GET.get('scene')
    sql = "select scene_pic from rotom_sceneinfo where user ='"+user+"' and title='"+scene+"'"
    cursor.execute(sql)
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return JsonResponse(json.dumps({'pic':result[0][0]}),safe=False)

def updatepic(request):
    conn = pymysql.connect(host="127.0.0.1", user="root", password=DB_password, database="rotom")
    cursor = conn.cursor()
    jsondata=json.loads(request.body,strict=False)
    title = jsondata.get('data').get('title')
    user = jsondata.get('data').get('user')
    pic = jsondata.get('data').get('pic')
    sql = "update rotom_sceneinfo set scene_pic='"+pic+"' where title="+"'"+title+"' and user='"+user+"'"
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()
    return JsonResponse({"status": "1"})