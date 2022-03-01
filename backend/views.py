from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework import response, status
from django.contrib.auth import authenticate

# Import Models here (if necessary)
from .models import CustomUser

# Import Serializers here
from .serializers import LoginSerializer, RegisterSerializer


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
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)

        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
                serializer = self.serializer_class(user)

                return response.Response(serializer.data, status=status.HTTP_200_OK)
        
        return response.Response({'message':"Invalid credentials, try again"}, status=status.HTTP_401_UNAUTHORIZED)


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