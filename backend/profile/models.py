from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    on_boarding = models.BooleanField(default=False, null=False)
    available_services = models.ManyToManyField("main.availableservices", related_name="profile")
