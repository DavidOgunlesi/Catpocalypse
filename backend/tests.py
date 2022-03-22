# from django.test import TestCase
# Django REST Framework provides a specific API TestCase class

import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework import status

# Import models and serializers
from backend.models import CustomUser

class TestModel(APITestCase):

        def test_creates_user(self):
                user=CustomUser.objects.create_user('TestUser','testuser@test.com','password123')
                self.assertIsInstance(user, CustomUser)
                #self.asser
                self.assertEqual(user.email, 'testuser@test.com')



"""
class RegistrationTestCase(APITestCase):

    def test_registration(self):
        data  = {"username":"testcase",
                "email":"test@company.com",
                "password" : "testing123"
                }
        response = self.client.post("/api/users/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
"""
    
    

    
