from django.urls import path, include
from .views import UserViewSet, ExampleAPIListView, test 
from rest_framework.routers import DefaultRouter

# Import views from views.py, really only going to 
# be APIViews here
#from .views import ExampleAPIListView #, GetCatView

router = DefaultRouter()
router.register('users',UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('test', test)
    # path('get_url', GetCatView.as_view())
]