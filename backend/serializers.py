from rest_framework import serializers

# Import Models here
from .models import ExampleModel
from .models import CustomUser



# Define Serializers here
class RegisterSerializer(serializers.ModelSerializer):

    # password should not be sent to front end at all
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email','username','password')
    
    # Must override serializer's create() method to hash password before
    # saving new user object
    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username']
            )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email','username','password','token')

        read_only_fields=['token']





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

'''
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
'''