from typing import Any

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from main.decorators import session_authentication
from main.models import Events
from main.models.events import EVENTS_FIELDS_MAPPING
from main.utils import explore_nested_object, model_to_dict


@require_http_methods(["GET"])
@session_authentication()
def list_all(request: Any) -> JsonResponse:
    """
    WIP

    :param Any request: django request object
    :return:
    """

    try:
        # authenticate user
        creds = Credentials.from_authorized_user_file(f"/tmp/{request.user.googlessouser.id}.json", [])
        service = build("calendar", "v3", credentials=creds)

        # set helper variables
        objects_to_create = []
        serialized_objects = []
        existing_objects = []

        # get all available calendars
        available_calenders = service.calendarList().list().execute().get("items") or []

        for calendar in available_calenders:
            results = service.events().list(calendarId=calendar["id"]).execute()
            for result in (results.get("items") or []):
                if Events.objects.filter(calendar_id=result["id"]).exists():
                    existing_objects.append(result["id"])
                    continue

                fields = {"user_id": request.user.id}
                for model_field, field in EVENTS_FIELDS_MAPPING.items():
                    fields[model_field] = explore_nested_object(result, field)

                serialized_objects.append(fields)
                objects_to_create.append(Events(**fields))

        Events.objects.bulk_create(objects_to_create)
        response_data = {
            "message": "Events fetched with success",
            "data": serialized_objects + [
                model_to_dict(item) for item in Events.objects.filter(calendar_id__in=existing_objects)
            ]
        }
        status = 201
    except (AttributeError, Exception):
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)
