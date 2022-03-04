from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework import response, status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Wildcat
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from rest_framework.response import Response
from . import functions

# Import Models here (if necessary)
from .models import CustomUser

# Import Serializers here
from .serializers import CatSerializer, LoginSerializer, RegisterSerializer


# Create your api views here. 
#class CustomUserView(generics.CreateAPIView):
    #queryset = CustomUser.objects.all()
    #serializer_class = CustomerUserSerializer

class RegisterAPIView(GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self,request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            # account was created

            user_data = serializer.data
            user = CustomUser.objects.get(email=user_data['email'])
            token = RefreshToken.for_user(user).access_token

            current_site = get_current_site(request).domain
            # relativeLink = reverse('email-verify')
            absurl = 'http://' + current_site + "/verify" + "/" + str(token)
            email_body = 'Hi ' + user.username + ' Use the link below to verify your email \n' + absurl
            data = {'email_body': email_body,'to_email': user.email, 'email_subject':'Verify your email'}
            Util.send_email(data)

            return response.Response(serializer.data, status=status.HTTP_201_CREATED)

        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token,settings.SECRET_KEY,algorithms='HS256')
            user = CustomUser.objects.get(id = payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'email':'Successfully Activated Email.','username':user.username}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as identifier:
            return Response({'error':'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error':'Invalid verification token. Your verification link may be incorrect.'}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(GenericAPIView):

    serializer_class = LoginSerializer

    def post(self,request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        # authenticate user
        user = authenticate(username=email, password=password)

        if user:
            if not user.is_verified:
                return response.Response({'message':"Please verify email"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # log them in
                # check if current user has an active session
                if not self.request.session.exists(self.request.session.session_key):
                    self.request.session.create()
                    self.request.session['username'] = user.username
                    data = {
                        'username':self.request.session.get('username')
                    }
                    return JsonResponse(data, status=status.HTTP_201_CREATED)
                else:
                    data = {
                        'username':self.request.session.get('username')
                    }
                    return JsonResponse(data, status=status.HTTP_200_OK)
        return response.Response({'message':"Invalid credentials, try again"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutAPIView(GenericAPIView):
    
    def get(self, request):
        # check if current user has an active session
        if not self.request.session.exists(self.request.session.session_key):
            # if current user does not have an active session, do nothing
            return response.Response({'message':"Already Logged out"}, status=status.HTTP_200_OK)
        else:
            # if current user does have ana active session, delete current session data and session cookie
            self.request.session.flush()
            return response.Response({'message':"Successfully logged out"}, status=status.HTTP_200_OK)



class IsLoggedInAPIView(GenericAPIView):

    def get(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            return response.Response({'message':"Not logged in"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {
                'username':self.request.session.get('username')
            }
            return JsonResponse(data, status=status.HTTP_200_OK) 


# API view to let us view a list of all the different wildcats
class GetCats(GenericAPIView):

    serializer_class = CatSerializer
    queryset = Wildcat.objects.all()

    def get(self, request):
        serializer = self.serializer_class()
        wildcats = Wildcat.objects.all()

        if wildcats:
            # if wildcats exist in the database, send wildcats
            serializer = CatSerializer(wildcats, many=True)
            return Response(serializer.data)
        else:
            # first generate wildcats, then send wildcats
            functions.cat_generation(10)
            serializer = CatSerializer(wildcats, many=True)
            return Response(serializer.data)


'''
class UserLoggedIn(APIView):
    def get(self, request, format=None):
        data = {
            'username': self.request.
        }

'''
     

'''class GetCatView(APIView):
    def get(self, request, format=None):
        lvlParameter = request.GET.get("level")
        if lvlParameter != None:
            returnedCats = Cat.objects.filter(level=lvlParameter)
            if len(returnedCats) > 0:
                #serialise room and get data
                data = GetCatSerialiser(returnedCats[0]).data
                return Response(data,status=status.HTTP_200_OK)
            
            return Response({'Error':'Bas request'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'Error':'Bas request'},status=status.HTTP_400_BAD_REQUEST)'''

'''
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
'''

################FOR AUTHENTICATION add this to class viewset
# permission_classes = [IsAuthenticated]
# authentication_classes = (TokenAuthentication,)