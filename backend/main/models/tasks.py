from django.contrib.auth.models import User
from django.db import models

TASKS_FIELDS_MAPPING = {
    "assignee_name": "assignee.issue.fields.assignee.displayName",
    "assignee_avatar": "assignee.issue.fields.assignee.avatarUrls['48x48']",
    "priority": "priority",
    "original_id": "key",
    "title": "fields.summary",
    "description": "fields.description",
    "status": "fields.status.name",
    "issue_id": "id",
    "estimation": "fields.timeestimate",
    "created_at": "fields.created",
    "updated_at": "fields.updated",
    "type_icon": "fields.issuetype.iconUrl",
    "type_name": "fields.issuetype.name"
}


class Tasks(models.Model):
    project_id = models.CharField(max_length=512, null=True, blank=True)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.DO_NOTHING)
    # assignee: {
    #     name: issue.fields.assignee.displayName,
    #     avatar: issue.fields.assignee.avatarUrls['48x48'],
    # },
    type_icon = models.CharField(max_length=512, null=True, blank=True)
    type_name = models.CharField(max_length=512, null=True, blank=True)
    assignee_name = models.CharField(max_length=512, null=True, blank=True)
    assignee_avatar = models.CharField(max_length=512, null=True, blank=True)
    # priority: 0,
    priority = models.IntegerField( null=True, blank=True)
    # original_id: issue.key,
    original_id = models.CharField(max_length=512, null=True, blank=True)
    # title: issue.fields.summary,
    title = models.CharField(max_length=1024, null=True, blank=True)
    # description: issue.fields.description | | '',
    description = models.TextField( null=True, blank=True)
    # status: issue.fields.status.name,
    status = models.TextField( null=True, blank=True)
    # id: parseInt(issue.id, 10),
    issue_id = models.CharField(max_length=512, null=True, blank=True)
    # estimation: issue.fields.timeestimate | | 1,
    estimation = models.CharField(max_length=32, null=True, blank=True)
    # created_at: issue.fields.created,
    created_at = models.CharField(max_length=32, null=True, blank=True)
    # updated_at: issue.fields.updated,
    updated_at = models.CharField(max_length=32, null=True, blank=True)
    # link to event
    event = models.ForeignKey("main.events", related_name="task", on_delete=models.DO_NOTHING, null=True)
