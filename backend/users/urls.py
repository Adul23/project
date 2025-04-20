from django.contrib import admin
from django.urls import path, include
from .views import UserInfoView, UserRegistrationView, LoginView, CookieTokenRefreshView
urlpatterns = [
    path('api/user-info/', UserInfoView.as_view(), name="user-info"),
    path('api/register/', UserRegistrationView.as_view(), name="register"),
    path('api/login/', LoginView.as_view(), name="login"),
    path('api/logout/', LoginView.as_view(), name="logout"),
    path('api/refresh/', CookieTokenRefreshView.as_view(), name="refresh-token")
]
