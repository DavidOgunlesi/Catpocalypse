from django.urls import path
from .views import index

#define urls here
urlpatterns = [
    path('', index),
    path('login', index),
    path('register', index)
    # path('create', index),
    # path('room/<str:roomCode>', index),
    
]