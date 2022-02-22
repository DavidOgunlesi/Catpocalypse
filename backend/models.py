from django.db import models

#Define functions up here
def exampleFunction():
    return "This is a Random String"

# Create your models here.
class ExampleModel(models.Model):
    # define fields we want for each room
    code = models.CharField(max_length=8, default=exampleFunction, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)