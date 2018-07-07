from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User

# new imports below

from django.http import HttpResponse
from django.shortcuts import render


# new code ~ ends here
class Resource(models.Model):
    """Represents a generic user-created or user-uploaded resource."""

    id = models.SlugField(max_length=150, primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User,
                                   null=True,
                                   related_name='created_by',
                                   on_delete=models.SET_NULL)
    created_date = models.DateTimeField(null=True)

admin.site.register(Resource)



class Test(models.Model):
    """Represents a generic user-created or user-uploaded resource."""

    email = models.CharField(max_length=200)
    fullName = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
   
admin.site.register(Test)

# class user(models.Model):
#     """Represents a generic user-created or user-uploaded resource."""

#     email = models.CharField(max_length=200)
#     fullName = models.CharField(max_length=200)
#     password = models.CharField(max_length=200)

   
# admin.site.register(user)
