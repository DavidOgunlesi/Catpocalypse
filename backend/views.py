import re
import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.http import Http404, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from rest_framework import generics, response, status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import APIView

from . import functions
# Import Models here (if necessary)
from .models import Catdex, CustomUser, Wildcat, Cats
# Import Serializers here
from .serializers import CatIDSerializer, CatSerializer, CatdexSerializer, LoginSerializer, RegisterSerializer
from .utils import Util

# Create your api views here. 
#class CustomUserView(generics.CreateAPIView):
    #queryset = CustomUser.objects.all()
    #serializer_class = CustomerUserSerializer


class CatchingCats(APIView):

    def post(self, request):

        if not self.request.session.exists(self.request.session.session_key):
            return Response({'error':'No user exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            username = self.request.session.get('username')
            user = CustomUser.objects.filter(username=username)[0]

            id = request.data.get("wildcat_id")
            wildcat = Wildcat.objects.filter(wildcat_id=id).first()

            if wildcat.is_huntable:
                if user.user_id == wildcat.player_1 or user.user_id == wildcat.player_2:
                    Catdex.objects.create(cat_id=wildcat.cat_id, user_id=user, health=wildcat.start_health, sex=wildcat.sex)
                    wildcat.delete()
                    return Response({'message':'Wildcat successfully added'}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message':'User is not allowed to catch this cat'}, status=status.HTTP_201_CREATED)


            if not wildcat:
                return Response({'error':'Wildcat does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                Catdex.objects.create(cat_id=wildcat.cat_id, user_id=user, health=wildcat.start_health, sex=wildcat.sex)
                wildcat.delete()
                return Response({'message':'Wildcat successfully added'}, status=status.HTTP_201_CREATED)
    """
    def post(self, request):

        for wildcat in Wildcat.objects.all():
            if wildcat.wildcat_id == int(request.data['wildcat_id']):
                found_wildcat = wildcat
                found_health = wildcat.start_health
                cat = wildcat.cat_id
        
        for user in CustomUser.objects.all():
            if user.username == str(self.request.session.get('username')):
                found_user = user
        
        Catdex.objects.create(cat_id = cat, user_id = found_user, health=found_health)
        found_wildcat.delete()

        return Response({}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    """



class GetAllCats(GenericAPIView):

    serializer_class = CatIDSerializer
    queryset = Cats.objects.all()

    def get(self, request):
        serializer = self.serializer_class()
        cats = Cats.objects.all()


        # if wildcats exist in the database, send wildcats
        serializer = CatIDSerializer(cats, many=True)
        return Response(serializer.data)

class GetOwnedCats(GenericAPIView):

    def get(self, request):

        queryset = Catdex.objects.all()
        res = []

        for user in CustomUser.objects.all():
                if user.username == str(self.request.session.get('username')):
                    found_user = user

        for catDexIns in queryset:
            if catDexIns.user_id == found_user:
                catIns = catDexIns.cat_id
                res.append({
                    'cat_id':catIns.cat_id,
                    'level':catDexIns.level, 
                    'health':catDexIns.health,
                    'name':catIns.name,
                    'type':catIns.type,
                    'rarity':catIns.rarity})  
                
        return response.Response({'data':res}, status=status.HTTP_200_OK)


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
                # user is available to play hunt the cat
                user.is_available = True
                user.save()
                functions.get_free_players()
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
            username = self.request.session.get('username')
            user = CustomUser.objects.filter(username=username)[0]
            user.is_available = False
            user.save()
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
            functions.capacity_check()
            new_wildcats = Wildcat.objects.all()
            serializer = CatSerializer(new_wildcats, many=True)
            return Response(serializer.data)

class WildcatDetail(APIView):
    """
    Return data for a wildcat given a wildcat id
    """
    def get_object(self, pk):
        try:
            return Wildcat.objects.get(pk=pk)
        except Wildcat.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        wildcat = self.get_object(pk)
        serializer = CatSerializer(wildcat)
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
