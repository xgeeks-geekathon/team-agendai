from django.contrib.auth.models import User
from django.db import models


class TaskEnhancement(models.Model):
    name = models.CharField(max_length=512)
    access_token = models.CharField(max_length=512)
    active = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
