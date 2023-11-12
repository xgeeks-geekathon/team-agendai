from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, related_name="user", on_delete=models.DO_NOTHING)
    on_boarding = models.BooleanField(default=False, null=False)
