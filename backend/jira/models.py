from django.db import models


class Jira(models.Model):
    project_id = models.IntegerField(null=False, blank=False)
