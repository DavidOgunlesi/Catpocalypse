from rest_framework import serializers
from rest_framework.authtoken.views import Token

# Import Models here
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User #built in django user model
        fields = ['id','username','password']

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
        
'''class GetCatSerialiser(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        # 'id' is primary key, every model has an "invisible" id field
        fields = ('type', 'level')'''