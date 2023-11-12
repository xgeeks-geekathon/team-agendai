from typing import Any

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication
from main.jira_service import JiraSingleton
from main.models import Tasks, Boards
from main.models.tasks import TASKS_FIELDS_MAPPING
from main.utils import explore_nested_object, model_to_dict


@require_http_methods(["GET"])
@session_authentication()
def list_all(request: Any, task_id: int = None) -> JsonResponse:
    """
    List or details a tasks

    :param Any request: django request object
    :param int task_id: task id (issue_id)
    :return:
    """

    try:
        if task_id:
            response_data = model_to_dict(Tasks.objects.get(issue_id=task_id))
            status = 200
        else:
            if request.GET.get("skipFetch"):
                response_data = {"result": [model_to_dict(item) for item in Tasks.objects.all()]}
                status = 200
            else:
                # add default board or specific board
                board, __ = Boards.objects.get_or_create(
                    user=request.user,
                    name=request.GET.get("boardName") or "Board 1"
                )
                jql = request.GET.get("query") or ""
                results = JiraSingleton().get_client().search_issues(jql_str=jql)
                objects_to_create = []
                serialized_objects = []
                existing_objects = []
                for result in results:
                    _task = Tasks.objects.filter(issue_id=result.id)

                    fields = {"user_id": request.user.id, "board_id": board.id}
                    for model_field, field in TASKS_FIELDS_MAPPING.items():
                        fields[model_field] = explore_nested_object(result, field)

                    if not _task.exists():
                        serialized_objects.append(fields)
                        objects_to_create.append(Tasks(**fields))
                    else:
                        _task.update(**fields)
                        existing_objects.append(_task.first())

                if existing_objects:
                    Tasks.objects.bulk_update(existing_objects, list(TASKS_FIELDS_MAPPING.keys()))

                if objects_to_create:
                    Tasks.objects.bulk_create(objects_to_create)

                response_data = {
                    "message": "Tasks fetched with success",
                    "data": serialized_objects + [model_to_dict(_task) for _task in existing_objects]
                }
                status = 201
    except Tasks.DoesNotExist:
        response_data = {"message": f"Task '{task_id}' does not exist"}
        status = 404
    except (AttributeError, Exception):
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)
