"""
This file will be used to contain all python based functions that will be triggered from the views file
""" 
from cgitb import html

from django.db import IntegrityError
from backend.models import *
import random
MAX_CATS = 10
CNTR_lat = 50.736603
CNTR_lon = -3.533233
lat_RANGE = 0.00335
lon_RANGE = 0.00367
# 50.736603, -3.533233 - CENTRE
# 50.739953, -3.533600 - FURTHEST POINT
# 0.00335, 0.000367 - LAT LON DIST
# distance range is 0.0033700


def capacity_check():
    """
        This function will check the number of cats on the map and will trigger the gat_generation function if necessary
    Returns:
        Boolean: Boolean to tell if any wildcats were added or not, True = Wildcats were added, False = No additions
    """
    # Count the number of Wildcat's
    cats_on_map = Wildcat.objects.all().count()
    # If there are not the max number of cats, add the correct number of cats
    if cats_on_map < MAX_CATS:
        # call cat_generation function and pass in the number of cats to generate
        cat_generation(10-cats_on_map)
        # As Wildcats were added, return True
        return True
    # Wildcats were not added, return False
    return False



def cat_generation(num):
    """
    This function will create cats if neccessary, it will create 'num' number of cats
    Args:
        num (_int_): the number of cats to be generated
    """
    # make_test_cats() # create some cats (REMOVE THIS)
    for i in range(num):
        # get a random cat from the Cats table
        rand_cat = Cats.objects.order_by('?').first() # May be a more efficient way to do this
        # get a random latitude and longitude within the approximate campus range
        rand_lat = random.uniform(CNTR_lat-lat_RANGE,CNTR_lat+lat_RANGE)
        rand_lon = random.uniform(CNTR_lon-lon_RANGE,CNTR_lon+lon_RANGE)
        # create a wildcat instance from this
        Wildcat.objects.create(latitude=rand_lat, longitude=rand_lon ,cat_id = rand_cat)



#when i deal with sending/recieving cats, i will call capacity check. then capacity check can return 
# true or false depending on whether cat generation was needed. if true, then i can send the updated cats back to frontend
    
def add_cats(apps, schema_editor):
    Cats = apps.get_model('backend', 'Cats')
    Cats.objects.create(name="Normal Cat", type=1, rarity=1)
    Cats.objects.create(name="Rock Cat", type=0, rarity=1)
    Cats.objects.create(name="Flame Cat", type=2, rarity=1)
    Cats.objects.create(name="Aqua Cat", type=3, rarity=1)

    Cats.objects.create(name="Injured Cat", type=1, rarity=2)
    Cats.objects.create(name="Lanky Cat", type=2, rarity=2)
    Cats.objects.create(name="Buff Cat", type=0, rarity=2)

    Cats.objects.create(name="Business Cat", type=1, rarity=3)
    Cats.objects.create(name="Boxer Cat", type=0, rarity=3)
    Cats.objects.create(name="Epic Cat", type=3, rarity=3)
    Cats.objects.create(name="Ninja Cat", type=4, rarity=3)

    Cats.objects.create(name="Void Cat", type=2, rarity=4)
    Cats.objects.create(name="Mini Cat", type=4, rarity=4)
    Cats.objects.create(name="Death Cat", type=2, rarity=4)

    Cats.objects.create(name="Neo Cat", type=3, rarity=5)
    Cats.objects.create(name="Terminator Cat", type=4, rarity=5)
    Cats.objects.create(name="Bat Cat", type=0, rarity=5)

    Cats.objects.create(name="God Cat", type=2, rarity=6)
    Cats.objects.create(name="FZ01 Cat", type=1, rarity=6)
    Cats.objects.create(name="Genesis Cat", type=3, rarity=6)
    Cats.objects.create(name="Messiah Cat", type=4, rarity=6)

    Cats.objects.create(name="Box Cat", type=1, rarity=0)
    Cats.objects.create(name="Grizzly Cat", type=4, rarity=2)
    Cats.objects.create(name="Spider Cat", type=0, rarity=2)
    Cats.objects.create(name="Top Cat", type=4, rarity=3)
    Cats.objects.create(name="Bull Cat", type=0, rarity=3)
    Cats.objects.create(name="Catoplane", type=3, rarity=4)
    Cats.objects.create(name="LionFlower", type=2, rarity=4)




