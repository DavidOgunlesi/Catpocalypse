from django.urls import path

# Import views from views.py, really only going to 
# be APIViews here
from .views import ExampleAPIListView #, GetCatView

urlpatterns = [
    path('api_url', ExampleAPIListView.as_view()),
    # path('get_url', GetCatView.as_view())
]