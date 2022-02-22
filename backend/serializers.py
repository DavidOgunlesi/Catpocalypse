from rest_framework import serializers

# Import Models here
from .models import ExampleModel

# Define Serializers here
class ExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        # 'id' is primary key, every model has an "invisible" id field
        fields = ('id', 'code', 'host', 'guest_can_pause', 
                  'votes_to_skip', 'created_at')