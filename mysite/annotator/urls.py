from .views import index, test_api
from django.urls import path

urlpatterns = [
    path('', index),
    path('test/', test_api)
]