from django.db import models


class AvailableServices(models.Model):
    name = models.Choi(max_length=512)
    access_token = models.CharField(max_length=512)
    active = models.BooleanField(default=False)
