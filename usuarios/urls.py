from django.urls import path, include
from .views import UsersView

urlpatterns = [
    path('users/', UsersView.as_view(), name='users')
]