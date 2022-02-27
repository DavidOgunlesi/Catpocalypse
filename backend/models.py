from django.db import models
from random import randint

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


def rand_val():
    """_summary_
    Return a random number to the code
    Returns:
        _type_: a random integer between the specified limits
    """
    return randint(50,100)


# Create your models here.

class Cats(models.Model):
    # define fields for the Cats table in the database
    cat_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=False)
    type = models.IntegerField(choices = TYPE_CHOICES, null=False)   
    rarity = models.IntegerField(choices = RARITY_CHOICES, null=False)   

class Wildcat(models.Model):
    # define fields for the Cats table in the database
    wildcat_id = models.AutoField(primary_key=True)
    cat_id = models.ForeignKey(Cats,on_delete=models.CASCADE, null=False)
    # note - used these values for digits and decimal places, these may be changed
    latitude = models.DecimalField(max_digits=22, decimal_places=16, null=False)
    longitude = models.DecimalField(max_digits=22, decimal_places=16, null=False)
    # rand_val generated in function above, limits can be changed
    start_health = models.IntegerField(default=rand_val(), null=False)
