from django.db import models

TYPE_CHOICES = (
    (0, 'Rock'),
    (1, 'Paper'),
    (2, 'Fire'),
    (3, 'Water'),
    (4, 'Sharp')
)

RARITY_CHOICES = (
    (1, 'Normal'),
    (2, 'Rare'),
    (3, 'Super Rare'),
    (4, 'Exotic'),
    (5, 'Legendary'),
    (6, 'Cat God')
)


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

class Cats(models.Model):
    # define fields for the Cats table in the database
    cat_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    type = models.IntegerField(choices = TYPE_CHOICES)   
    rarity = models.IntegerField(choices = RARITY_CHOICES)   

    