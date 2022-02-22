from django.urls import path
from .views import index

#define urls here
urlpatterns = [
    path('', index),
    # path('join', index),
    # path('create', index),
    # path('room/<str:roomCode>', index),
]