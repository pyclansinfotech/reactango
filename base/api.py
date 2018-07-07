from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
import json
from models import Test
# from models import user
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
import random
import string




def hello_page_data(request):
    json_response = {
        'url': 'https://earth.nullschool.net/' +
               '#current/wind/surface/level/overlay=cape/orthographic=278.37,28.60,346',
    }

    json_response_string = json.dumps(json_response, sort_keys=True, indent=4)
    return HttpResponse(json_response_string, content_type="application/json")



# CSRF_COOKIE_SECURE = True
@csrf_exempt
def deleteUserAccount(request):
    data = json.loads(request.body)
    data = data["needToSend"][0] 
    try:
        isUserValid = User.objects.get(email=data['email'], password=data['password'])
        User.objects.filter(username = isUserValid).delete()
        return HttpResponse(json.dumps({"message":"success"}), content_type="application/json")
    except ObjectDoesNotExist:
        print 'Wrong Credentials'

@csrf_exempt
def updateUserDetails(request):
    data = json.loads(request.body)
    data = data["needToSend"][0] 
    try:
        isUserValid = User.objects.get(email=data['email'], password=data['password'])
        User.objects.filter(username = isUserValid).update(email=data['email'], first_name=data['fullName'])
        userDetails = User.objects.filter(username = isUserValid)
        returnData = {}
        for x in userDetails:
            returnData["email"] = x.email
            returnData["first_name"] = x.first_name
            returnData["username"] = x.username
            returnData["password"] = x.password
        return HttpResponse(json.dumps(returnData), content_type="application/json")
    except ObjectDoesNotExist:
        print 'Wrong Credentials'
        return HttpResponse(json.dumps({"message":"wrongCredentials"}), content_type="application/json")


@csrf_exempt
def login_function(request):
    data = json.loads(request.body)
    data = data["needToSend"][0] 
    try:
        isUserValid = User.objects.get(email=data['email'], password=data['password'])
        print 'Login Successfully',isUserValid
        userDetails = User.objects.filter(username = isUserValid)
        returnData = {}
        for x in userDetails:
            returnData["email"] = x.email
            returnData["first_name"] = x.first_name
            returnData["username"] = x.username
            returnData["password"] = x.password
            # returnData.push({'email':x.email,'name':x.first_name, 'username':x.username, 'password':x.password})
        # print userDetails
        # User.objects.all().values_list('username', flat=True) 
        # print ('isUserValid Data',isUserValid)
        # userDetails = User.objects.filter(username = 'testuser')
        # userDetails = User.objects.values('username')
        # print ('userDetails',userDetails)
        return HttpResponse(json.dumps(returnData), content_type="application/json")
    except ObjectDoesNotExist:
        print 'Wrong Credentials'
        return HttpResponse(json.dumps({"message":"wrongCredentials"}), content_type="application/json")
    return HttpResponse(request.body, content_type="application/json")

@csrf_exempt
def test_function(request):
    data = json.loads(request.body)
    data = data["needToSend"][0]
    print(data)
    User.objects.create(first_name=data['fullName'],email=data['email'],password=data['password'], username=data['username'])
    print('success')

    return HttpResponse(request.body, content_type="application/json")
    
    # request = '{"x": 1, "x": 2, "x": 3}'
    # print(request)
    # def test_function(request):
    # if request.POST: #os request.GET()
        # get_value = request.body
        # Do your logic here coz you got data in `get_value`
        # data = {}
        # data['result'] = 'you made a request'
        # print('request',get_value)
        # return HttpResponse(request.body, content_type="application/json")

# def test_function(request):
#     print('allRecords',request)

    # return render(request,'../templates/react_template.html')
    # print('helo sachin')


"""
    # use raw SQL to compute family and individual counts using nested queries
    cursor = connection.cursor()
    cursor.execute("
SELECT
*,
(SELECT count(*) FROM base_family WHERE project_id=base_project.id) AS num_families,
(SELECT count(*) FROM base_individual WHERE project_id=base_project.id) AS num_individuals
FROM base_project
")

columns = [col[0] for col in cursor.description]
json_obj = [dict(zip(columns, row)) for row in cursor.fetchall()]
cursor.close()

json_response_string = json.dumps(
    {"projects": json_obj}, sort_keys=True, indent=4, default=DateTimeAwareJSONEncoder().default)

return HttpResponse(json_response_string, content_type="application/json")
"""