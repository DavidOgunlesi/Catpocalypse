from django.urls import path, include
from .views import UserViewSet, ExampleAPIListView, test 
from rest_framework.routers import DefaultRouter

# Import views from views.py, really only going to 
# be APIViews here

router = DefaultRouter()
router.register('users',UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api_url', ExampleAPIListView.as_view()),
    path('test', test)
    # path('get_url', GetCatView.as_view())
]