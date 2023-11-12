import json
from typing import Any

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication
import tempfile
import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from django.contrib.sessions.models import Session

@require_http_methods(["GET"])
@session_authentication()
def list_all(request: Any) -> JsonResponse:
    """
    WIP

    :param Any request: django request object
    :return:
    """

    creds = Credentials.from_authorized_user_file(f"/tmp/{request.user.googlessouser.id}.json", [])
    service = build('calendar', 'v3', credentials=creds)
    events_result = (
        service.events()
        .list(
            calendarId="primary",
            timeMin=datetime.datetime.utcnow().isoformat() + "Z",
            maxResults=10,
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )
    events = events_result.get("items", [])

    return JsonResponse(data={"data": events}, status=200)
