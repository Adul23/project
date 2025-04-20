from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager

class CustomUser(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField(max_length=255, unique=True)
    REQUIRED_FIELDS = []
    fields = '__all__'
    objects = CustomUserManager()
