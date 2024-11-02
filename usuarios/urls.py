from django.urls import path, include
from .views import UsersView, UsersSettings, LoginUsersView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UsersView.as_view(), name='users'),
    path('users_settings/', UsersSettings.as_view(), name='users_settings'),
    path('users_settings/<int:pk>/', UsersSettings.as_view(), name='users_settings'),
    path('login/', LoginUsersView.as_view(), name="login_users"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]