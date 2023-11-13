import logging
from typing import Any

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from main.decorators import session_authentication
from main.models import Events
from main.models.events import EVENTS_FIELDS_MAPPING
from main.utils import explore_nested_object, model_to_dict

LOGGER = logging.getLogger("console")

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
                _event = Events.objects.filter(calendar_id=result["id"])

                fields = {"user_id": request.user.id}
                for model_field, field in EVENTS_FIELDS_MAPPING.items():
                    fields[model_field] = explore_nested_object(result, field)

                if not _event.exists():
                    serialized_objects.append(fields)
                    objects_to_create.append(Events(**fields))
                else:
                    _event.update(**fields)
                    existing_objects.append(_event.first())

        if existing_objects:
            Events.objects.bulk_update(existing_objects, list(EVENTS_FIELDS_MAPPING.keys()))

        if objects_to_create:
            Events.objects.bulk_create(objects_to_create)

        response_data = {
            "message": "Events fetched with success",
            "data": serialized_objects + [model_to_dict(item) for item in existing_objects]
        }
        status = 201
    except (AttributeError, Exception) as error:
        LOGGER.error(error)
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)
