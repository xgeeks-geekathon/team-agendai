from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.DO_NOTHING)
    on_boarding = models.BooleanField(default=False, null=False)
    google_access_token = models.CharField(max_length=512, null=True, blank=True)
