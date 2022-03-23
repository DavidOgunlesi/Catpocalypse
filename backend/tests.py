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
                user=CustomUser.objects.create_user('testuser@test.com','testuser','password123')
                self.assertIsInstance(user, CustomUser)
                self.assertFalse(user.is_staff)
                self.assertEqual(user.email, 'testuser@test.com')
        

        def test_raises_error_when_no_email_is_supplied(self):
                self.assertRaises(ValueError, 
                        CustomUser.objects.create_user,
                        email='',
                        username='testuser', password='password123')
        

        def test_raises_error_message_when_no_email_is_supplues(self):
                with self.assertRaisesMessage(ValueError, 'Users must have an email address'):
                        user=CustomUser.objects.create_user(email='', username='testuser', password='password123')
        

        def test_raises_error_when_no_username_is_supplied(self):
                self.assertRaises(ValueError, 
                        CustomUser.objects.create_user,
                        email='testuser@test.com',
                        username='', password='password123')
        

        def test_raises_error_message_when_no_username_is_supplues(self):
                with self.assertRaisesMessage(ValueError, 'Users must have an username'):
                        user=CustomUser.objects.create_user(email='testuser@test.com', username='', password='password123')


        def test_creates_super_user(self):
                user=CustomUser.objects.create_superuser('testuser@test.com','testuser','password123')
                self.assertIsInstance(user, CustomUser)
                self.assertTrue(user.is_staff)
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
    
    

    
