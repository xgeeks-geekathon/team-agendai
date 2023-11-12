from django.contrib.auth.models import User
from django.db import models


class TaskEnhancement(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    task = models.ForeignKey(
        "main.tasks",
        related_name="enhancement",
        on_delete=models.DO_NOTHING,
        null=True,
        default=None,
        blank=True
    )
    value = models.JSONField(default=None, blank=True, null=True)
