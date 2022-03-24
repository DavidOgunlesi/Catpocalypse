from django.urls import path, include
from .views import GetOwnedCats, RegisterAPIView, CatchingCats, GetAllCats, WildcatDetail, StartMatchmaking
from .views import LoginAPIView, getAllCatDex, EndMatchmaking, GetMatch, LevelUp
from .views import IsLoggedInAPIView
from .views import VerifyEmail
from .views import GetCats
from .views import LogoutAPIView

#from rest_framework.routers import DefaultRouter

# Import views from views.py, really only going to 
# be APIViews here
# from .views import ExampleAPIListView #, GetCatView

# router = DefaultRouter()
# router.register('users',UserViewSet)

urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('isLoggedIn', IsLoggedInAPIView.as_view()),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('get-cats', GetCats.as_view()),
    path('send-cats', CatchingCats.as_view()),
    path('wildcat/<int:pk>', WildcatDetail.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('get-all-cats', GetAllCats.as_view()),
    path('get-owned-cats', GetOwnedCats.as_view()),

    path('start-matchmaking', StartMatchmaking.as_view()),
    path('end-matchmaking', EndMatchmaking.as_view()),
    path('get-match', GetMatch.as_view()),
    path('level-up', LevelUp.as_view()),
    path('get-catdex', getAllCatDex.as_view()),
    
    #path('', include(router.urls)),
    #path('api_url', ExampleAPIListView.as_view()),
    # path('get_url', GetCatView.as_view())
]