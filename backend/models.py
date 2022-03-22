import imp
from django.db import models
from django.conf import settings
from random import randint
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.conf import settings

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


def exampleFunction():
    return "This is a Random String"


# Create your models here.

class CustomUserManager(BaseUserManager):
    # must override two methods

    # what happends when a new user is created
    # must inlcude REQUIRED_FIELDS
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have an username")
        
        user = self.model(
            # normalize_email - convert characters in email to lowercase
            # available inside of the BaseUserManager Class
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    

    # what happends when superuser is created
    def create_superuser(self, email, username, password):

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user





# Custom Django user model
class CustomUser(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)

    # required fields 
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # additional fields
    is_verified = models.BooleanField(default=False)

    # set to what you want user to log in with
    USERNAME_FIELD = 'email'

    # required fields when registering
    REQUIRED_FIELDS = ['username']

    # where manager is
    objects = CustomUserManager()

    # to string
    def __str__(self):
        return self.username
    
    # required functions to build customer user
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True


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
    name = models.CharField(max_length=20, null=False, unique=True)
    sex = models.CharField(max_length=10, null=False)
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
    start_health = models.IntegerField(null=False, default=rand_val)

class Catdex(models.Model):
    catdex_id = models.AutoField(primary_key=True)
    cat_id = models.ForeignKey(Cats,on_delete=models.CASCADE, null=False)
    # user_id relies on the above import of django.conf.settings
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, null=False)
    # this could be changed to a DecimalField which is preferable at a later stage
    level = models.FloatField(null=False, default=1)
    health = models.IntegerField(null=False)
