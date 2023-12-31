from django.contrib.auth.models import User
from django.db import models

EVENTS_FIELDS_MAPPING = {
    "calendar_id": "id",
    "status": "status",
    "htmlLink": "htmlLink",
    "updated": "updated",
    "summary": "summary",
    "description": "description",
    "start": "start.dateTime",
    "end": "end.dateTime",
    "attendees": "attendees",
    "organizer": "organizer",
}


class Events(models.Model):
    calendar_id = models.CharField(max_length=512, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    status = models.CharField(max_length=52, null=True, blank=True)
    htmlLink = models.CharField(max_length=128, null=True, blank=True)
    created = models.CharField(max_length=32, null=True, blank=True)
    updated = models.CharField(max_length=32, null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    start = models.CharField(max_length=32, null=True, blank=True)
    end = models.CharField(max_length=32, null=True, blank=True)
    attendees = models.JSONField(null=True, blank=True, default=None)
    organizer = models.JSONField(null=True, blank=True, default=None)
    # should be singular
    task = models.ForeignKey(
        "main.tasks",
        related_name="event",
        default=None,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING
    )

