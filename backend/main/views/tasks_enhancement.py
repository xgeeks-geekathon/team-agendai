from typing import Any

import openai
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication
from main.models import Tasks


@require_http_methods(["GET"])
@session_authentication()
def list_all(request: Any, task_id:int) -> JsonResponse:
    """
    WIP

    :param Any request: django request object
    :return:
    """

    status = 200
    try:
        task = Tasks.objects.filter(issue_id=task_id).first()
        if not task:
            raise Tasks.DoesNotExist()

        openai.api_key = settings.OPENAPI_KEY
        messages = [
            # {"role": "system", "content": "You are a intelligent assistant, aren't you?!"},
            {"role": "user", "content": task.description},
        ]

        chat = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
        response_data = {"result": chat.choices[0].message.content}
    except Tasks.DoesNotExist:
        response_data = {"message": f"Task '{task_id}' does not exist"}
        status = 404
    except (AttributeError, Exception):
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)
