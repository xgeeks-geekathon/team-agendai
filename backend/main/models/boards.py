from django.contrib.auth.models import User
from django.db import models


class Boards(models.Model):
    name = models.CharField(max_length=512)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.DO_NOTHING)
    tasks = models.ManyToManyField("main.tasks", related_name="board")
