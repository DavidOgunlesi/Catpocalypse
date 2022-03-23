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


def get_free_players():
    qs = CustomUser.objects.filter(is_available = True)

    if len(qs) >= 2:
        x = random.randint(0,len(qs))
        player1 = qs[x]
        qs.remove(player1)
        x = random.randint(0,len(qs))
        player2 = qs[x]
        qs.remove(player2)

    player1.is_available = False
    player2.is_available = False
    player1.save()
    player2.save()

    # get a random cat from the Cats table
    rand_cat = Cats.objects.filter(rarity__gte=4).order_by('?').first() 
    # get a random latitude and longitude within the approximate campus range
    rand_lat = random.uniform(CNTR_lat-lat_RANGE,CNTR_lat+lat_RANGE)
    rand_lon = random.uniform(CNTR_lon-lon_RANGE,CNTR_lon+lon_RANGE)
    # create a wildcat instance from this
    

    HuntableCats.objects.create(
        player_1=player1, 
        player_2=player2,
        wildcat_id=Wildcat.objects.create(latitude=rand_lat, longitude=rand_lon ,cat_id = rand_cat))




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
        rand_cat = Cats.objects.order_by('?').first()
        # get a random latitude and longitude within the approximate campus range
        rand_lat = random.uniform(CNTR_lat-lat_RANGE,CNTR_lat+lat_RANGE)
        rand_lon = random.uniform(CNTR_lon-lon_RANGE,CNTR_lon+lon_RANGE)
        # get sex
        if random.randint(0,1) == 0:
            tmp = 'Male'
        else:
            tmp = 'Female'

        # create a wildcat instance from this
        Wildcat.objects.create(latitude=rand_lat, longitude=rand_lon ,cat_id = rand_cat, sex=tmp)



#when i deal with sending/recieving cats, i will call capacity check. then capacity check can return 
# true or false depending on whether cat generation was needed. if true, then i can send the updated cats back to frontend
# HI
    
def add_cats(apps, schema_editor):
    '''
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
    '''
    Cats = apps.get_model('backend', 'Cats')
    Cats.objects.create(name="Normal Cat", type=1, rarity=1) #1
    Cats.objects.create(name="Rock Cat", type=0, rarity=1) #2
    Cats.objects.create(name="Flame Cat", type=2, rarity=1) #3
    Cats.objects.create(name="Aqua Cat", type=3, rarity=1) #4

    Cats.objects.create(name="Injured Cat", type=1, rarity=2) #5
    Cats.objects.create(name="Lanky Cat", type=2, rarity=2) #6
    Cats.objects.create(name="Buff Cat", type=0, rarity=2) #7

    Cats.objects.create(name="Business Cat", type=1, rarity=3) #8
    Cats.objects.create(name="Boxer Cat", type=0, rarity=3) #9
    Cats.objects.create(name="Epic Cat", type=3, rarity=3) #10
    Cats.objects.create(name="Ninja Cat", type=4, rarity=3) #11

    Cats.objects.create(name="Void Cat", type=2, rarity=4) #12
    Cats.objects.create(name="Mini Cat", type=4, rarity=4) #13
    Cats.objects.create(name="Death Cat", type=2, rarity=4) #14

    Cats.objects.create(name="Neo Cat", type=3, rarity=5) #15
    Cats.objects.create(name="Terminator Cat", type=4, rarity=5) #16
    Cats.objects.create(name="Bat Cat", type=0, rarity=5) #17

    Cats.objects.create(name="God Cat", type=2, rarity=6) #18
    Cats.objects.create(name="FZ01 Cat", type=1, rarity=6) #19
    Cats.objects.create(name="Genesis Cat", type=3, rarity=6) #20
    Cats.objects.create(name="Messiah Cat", type=4, rarity=6) #21

    Cats.objects.create(name="Box Cat", type=1, rarity=1) #22
    Cats.objects.create(name="Grizzly Cat", type=4, rarity=2) #23
    Cats.objects.create(name="Spider Cat", type=0, rarity=2) #24
    Cats.objects.create(name="Top Cat", type=4, rarity=3) #25
    Cats.objects.create(name="Bull Cat", type=0, rarity=3) #26
    Cats.objects.create(name="Catoplane", type=3, rarity=4) #27
    Cats.objects.create(name="LionFlower", type=2, rarity=4) #28
    
    Cats.objects.create(name="Double Headed Cat", type=1, rarity=4) #29
    Cats.objects.create(name="Credit Card Cat", type=1, rarity=4) #30
    Cats.objects.create(name="Bagged Cat", type=1, rarity=1) #31
    Cats.objects.create(name="Toaster Cat", type=0, rarity=3) #32




