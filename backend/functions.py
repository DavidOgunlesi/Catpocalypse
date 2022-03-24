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


def begin_hunt_the_cat():
    active_players = ActivePlayer.objects.all()
    if len(active_players) >= 2:
        active_player_1 = active_players[0]
        player_1 = active_player_1.user
        active_player_2 = active_players[1]
        player_2 = active_player_2.user

        # create a wildcat
        rand_cat = Cats.objects.order_by('?').first()
        rand_lat = random.uniform(CNTR_lat-lat_RANGE,CNTR_lat+lat_RANGE)
        rand_lon = random.uniform(CNTR_lon-lon_RANGE,CNTR_lon+lon_RANGE)
        if random.randint(0,1) == 0:
            tmp = 'Male'
        else:
            tmp = 'Female'
        hunt_the_cat_wildcat = Wildcat.objects.create(latitude=rand_lat, longitude=rand_lon ,cat_id = rand_cat, sex=tmp,
                                                            is_huntable = True, player_1=player_1, player_2=player_2)
        

        # players are now in an active game and no longer available
        active_player_1.delete()
        active_player_2.delete()


        if random.randint(0,1) == 0:
                tmp = 'Male'
        else:
            tmp = 'Female'
        
        Wildcat.objects.create(latitude=rand_lat, longitude=rand_lon , is_huntable=True, cat_id = rand_cat, sex=tmp, player_1=player1, player_2=player2)



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
    
def load_data(apps, schema_editor):
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

    Moves = apps.get_model('backend', 'Moves')
    m1 = Moves.objects.create(move_name = 'Golem Volley', damage_type = 0, power = 43) #1
    m2 = Moves.objects.create(move_name = 'Oak Crush', damage_type = 0, power = 42) #2
    m3 = Moves.objects.create(move_name = 'Skeletal Claw Jolt', damage_type = 4, power = 54) #3
    m4 = Moves.objects.create(move_name = 'Diamond Whip', damage_type = 0, power = 76) #4
    m5 = Moves.objects.create(move_name = 'Venom Fists', damage_type = 3, power = 65) #5
    m6 = Moves.objects.create(move_name = 'Echo', damage_type = 1, power = 32) #6
    m7 = Moves.objects.create(move_name = 'Cloud Slash', damage_type = 3, power = 48) #7
    m8=Moves.objects.create(move_name = 'Shadow Charge', damage_type = 1, power = 78) #8
    m9=Moves.objects.create(move_name = 'Droplet Dive', damage_type = 3, power = 69) #9
    m10=Moves.objects.create(move_name = 'Puny Stealth Shot', damage_type = 4, power = 21) #10
    m11=Moves.objects.create(move_name = 'Quick Puppet', damage_type = 1, power = 27) #11
    m12=Moves.objects.create(move_name = 'Fading Fist', damage_type = 3, power = 47) #12
    m13=Moves.objects.create(move_name = 'Body Bolt', damage_type = 2, power = 55) #13
    m14=Moves.objects.create(move_name = 'Dual Crescent Fist', damage_type = 2, power = 73) #14
    m15=Moves.objects.create(move_name = 'Stampede', damage_type = 1, power = 68) #15
    m16=Moves.objects.create(move_name = 'Swarm', damage_type = 4, power = 60) #16
    m17=Moves.objects.create(move_name = 'Evaporate', damage_type = 2, power = 80) #17
    m18=Moves.objects.create(move_name = 'Kill', damage_type = 4, power = 82) #18
    m19=Moves.objects.create(move_name = 'Terminate', damage_type = 4, power = 93) #19

    m20=Moves.objects.create(move_name = 'Repair', damage_type = 0, power = -30) #20
    m21=Moves.objects.create(move_name = 'Curse', damage_type = 2, power = -24) #21
    m22=Moves.objects.create(move_name = 'Siphon Funds', damage_type = 4, power = -10) #22
    m23=Moves.objects.create(move_name = 'Matrix Dodge', damage_type = 1, power = -40) #23
    m24=Moves.objects.create(move_name = 'Guarding Pound', damage_type = 3, power = -37) #24



    Cats = apps.get_model('backend', 'Cats')
    Cats.objects.create(name="Normal Cat", type=1, rarity=1, m1=m1, m2=m2, m3=m24, m4=m10) #1
    Cats.objects.create(name="Rock Cat", type=0, rarity=1, m1=m1, m2=m3, m3=m4, m4=m20) #2
    Cats.objects.create(name="Flame Cat", type=2, rarity=1, m1=m8, m2=m17, m3=m24, m4=m13) #3
    Cats.objects.create(name="Aqua Cat", type=3, rarity=1, m1=m2, m2=m9, m3=m7, m4=m24) #4

    Cats.objects.create(name="Injured Cat", type=1, rarity=2, m1=m11, m2=m13, m3=m22, m4=m6) #5
    Cats.objects.create(name="Lanky Cat", type=2, rarity=2, m1=m6, m2=m7, m3=m7, m4=m24) #6
    Cats.objects.create(name="Buff Cat", type=0, rarity=2, m1=m4, m2=m8, m3=m13, m4=m24) #7

    Cats.objects.create(name="Business Cat", type=1, rarity=3, m1=m16, m2=m15, m3=m14, m4=m22) #8
    Cats.objects.create(name="Boxer Cat", type=0, rarity=3, m1=m13, m2=m12, m3=m14, m4=m23) #9
    Cats.objects.create(name="Epic Cat", type=3, rarity=3, m1=m3, m2=m18, m3=m7, m4=m21) #10
    Cats.objects.create(name="Ninja Cat", type=4, rarity=3, m1=m6, m2=m11, m3=m12, m4=m21) #11

    Cats.objects.create(name="Void Cat", type=2, rarity=4, m1=m5, m2=m15, m3=m10, m4=m20) #12
    Cats.objects.create(name="Mini Cat", type=4, rarity=4, m1=m16, m2=m11, m3=m10, m4=m21) #13
    Cats.objects.create(name="Death Cat", type=2, rarity=4, m1=m18, m2=m17, m3=m3, m4=m21) #14

    Cats.objects.create(name="Neo Cat", type=3, rarity=5, m1=m23, m2=m3, m3=m13, m4=m1) #15
    Cats.objects.create(name="Terminator Cat", type=4, rarity=5, m1=m20, m2=m19, m3=m18, m4=m13) #16
    Cats.objects.create(name="Bat Cat", type=0, rarity=5, m1=m24, m2=m16, m3=m10, m4=m7) #17

    Cats.objects.create(name="God Cat", type=2, rarity=6, m1=m23, m2=m18, m3=m4, m4=m5) #18
    Cats.objects.create(name="FZ01 Cat", type=1, rarity=6, m1=m23, m2=m18, m3=m13, m4=m7) #19
    Cats.objects.create(name="Genesis Cat", type=3, rarity=6, m1=m23, m2=m18, m3=m17, m4=m8) #20
    Cats.objects.create(name="Messiah Cat", type=4, rarity=6, m1=m23, m2=m18, m3=m5, m4=m6) #21

    Cats.objects.create(name="Box Cat", type=1, rarity=1, m1=m4, m2=m7, m3=m13, m4=m21) #22
    Cats.objects.create(name="Grizzly Cat", type=4, rarity=2, m1=m2, m2=m9, m3=m13, m4=m12) #23
    Cats.objects.create(name="Spider Cat", type=0, rarity=2, m1=m8, m2=m13, m3=m5, m4=m23) #24
    Cats.objects.create(name="Top Cat", type=4, rarity=3, m1=m12, m2=m5, m3=m4, m4=m22) #25
    Cats.objects.create(name="Bull Cat", type=0, rarity=3, m1=m14, m2=m3, m3=m6, m4=m24) #26
    Cats.objects.create(name="Catoplane", type=3, rarity=4, m1=m17, m2=m13, m3=m12, m4=m24) #27
    Cats.objects.create(name="LionFlower", type=2, rarity=4, m1=m17, m2=m12, m3=m18, m4=m20) #28
    
    Cats.objects.create(name="Double Headed Cat", type=1, rarity=4, m1=m13, m2=m14, m3=m16, m4=m20) #29
    Cats.objects.create(name="Credit Card Cat", type=1, rarity=4, m1=m3, m2=m22, m3=m8, m4=m9) #30
    Cats.objects.create(name="Bagged Cat", type=1, rarity=1, m1=m4, m2=m8, m3=m12, m4=m21) #31
    Cats.objects.create(name="Toaster Cat", type=0, rarity=3, m1=m5, m2=m7, m3=m11, m4=m23) #32




