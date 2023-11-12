from django.contrib.auth.models import User
from django.db import models


class Events(models.Model):
    calendar_id = models.CharField(max_length=512)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
