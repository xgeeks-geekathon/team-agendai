import jira
from django.conf import settings

auth_jira = jira(token_auth=settings.JIRA_TOKEN)
