from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class User(AbstractUser):
    email = models.EmailField(unique=True)

    phone_regex = RegexValidator(
        regex=r'^01[0125][0-9]{8}$',
        message="Phone number must be a valid Egyptian number (e.g. 01012345678)"
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=11, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email
