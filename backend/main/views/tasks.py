from typing import Any

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication
from main.jira_service import JiraSingleton
from main.models import Tasks
from main.models.tasks import TASKS_FIELDS_MAPPING
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
        jql = request.GET.get("query") or ""
        results = JiraSingleton().get_client().search_issues(jql_str=jql)
        objects_to_create = []
        serialized_objects = []
        existing_objects = []
        for result in results:
            if Tasks.objects.filter(issue_id=result.id).exists():
                existing_objects.append(result.id)
                continue

            fields = {"user_id": request.user.id}
            for model_field, field in TASKS_FIELDS_MAPPING.items():
                fields[model_field] = explore_nested_object(result, field)

            serialized_objects.append(fields)
            objects_to_create.append(Tasks(**fields))

        Tasks.objects.bulk_create(objects_to_create)
        response_data = {
            "message": "Tasks fetched with success",
            "data": serialized_objects + [
                model_to_dict(_task) for _task in Tasks.objects.filter(issue_id__in=existing_objects)
            ]
        }
        status = 201
    except (AttributeError, Exception):
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)
