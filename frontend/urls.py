from django.urls import path
from .views import index

#define urls here
urlpatterns = [
    path('', index),
    path('login', index),
    path('register', index),
    path('verify',index),
    path('verify/<str:token>',index),
    path('dev/map',index),
    path('dev/catdex',index)
    # path('create', index),
    # path('room/<str:roomCode>', index),d
    
]