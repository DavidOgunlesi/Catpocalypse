from django.urls import path, include
from .views import RegisterAPIView

#from rest_framework.routers import DefaultRouter

# Import views from views.py, really only going to 
# be APIViews here
# from .views import ExampleAPIListView #, GetCatView

# router = DefaultRouter()
# router.register('users',UserViewSet)

urlpatterns = [
    path('register', RegisterAPIView.as_view())
    #path('', include(router.urls)),
    #path('api_url', ExampleAPIListView.as_view()),
    # path('get_url', GetCatView.as_view())
]