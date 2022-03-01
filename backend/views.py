from django.shortcuts import render
from rest_framework import generics

# Import Models here (if necessary)
from .models import CustomUser

# Import Serializers here
from .serializers import CustomerUserSerializer


# Create your api views here. 
class CustomUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomerUserSerializer
     

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