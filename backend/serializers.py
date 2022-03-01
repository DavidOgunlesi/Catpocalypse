from rest_framework import serializers
from rest_framework.authtoken.views import Token

# Import Models here
from .models import ExampleModel
from django.contrib.auth.models import User





class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User #built in django user model
        fields = ['id','username','email','password']

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user




# Define Serializers here
class ExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        # 'id' is primary key, every model has an "invisible" id field
        fields = ('id', 'code', 'host', 'guest_can_pause', 
                  'votes_to_skip', 'created_at')
        
class ExampleSerializer2(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        # 'id' is primary key, every model has an "invisible" id field
        fields = ('code', 'created_at')
        
'''class GetCatSerialiser(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        # 'id' is primary key, every model has an "invisible" id field
        fields = ('type', 'level')'''