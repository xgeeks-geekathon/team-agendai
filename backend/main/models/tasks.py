from django.contrib.auth.models import User
from django.db import models


class Tasks(models.Model):
    project_id = models.CharField(max_length=512, null=False, blank=False)
    issue_id = models.CharField(max_length=512, null=False, blank=False)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.DO_NOTHING)
