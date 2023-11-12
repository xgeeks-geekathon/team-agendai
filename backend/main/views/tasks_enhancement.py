from typing import Any

import openai
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication
from main.models import Tasks, TaskEnhancement
from main.utils import model_to_dict

CONTEXT_MESSAGE = """
You are an expert Product Owner.
Your team uses SCRUM methodology.
The tasks are of technical nature.

Improve the task information:

- Suggest a better title if necessary.

- Suggest a better description or improve the existing one if necessary.
The description should be return in MARKDOWN with nice and detailed formatting.

- Write the task description with goal, business criteria (only when necessary), acceptance criteria and technical details (only when necessary)

- Provide a time span for the task in hours.

You ALWAYS return a JSON response with the following format:

{
      title: "string";
      description: string;
      duration: number;
};
"""


@require_http_methods(["GET"])
@session_authentication()
def list_all(__: Any, task_id: int = None) -> JsonResponse:
    """
    List or details a task enhanced

    :param Any __: django request object
    :param int task_id: task id (issue_id)
    :return:
    """

    status = 200
    try:
        if task_id:
            response_data = model_to_dict(TaskEnhancement.objects.get(task__issue_id=task_id))
        else:
            response_data = {"result": [model_to_dict(item) for item in TaskEnhancement.objects.all()]}
    except TaskEnhancement.DoesNotExist:
        response_data = {"message": f"Task enhanced '{task_id}' does not exist"}
        status = 404
    except (AttributeError, Exception):
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)


@require_http_methods(["GET"])
@session_authentication()
def enhancement(request: Any, task_id: int) -> JsonResponse:
    """
    Enhance a given task.

    :param Any request: django request object
    :param int task_id: task id (issue_id)
    :return:
    """

    status = 200
    try:
        task = Tasks.objects.filter(issue_id=task_id).first()
        if not task:
            raise Tasks.DoesNotExist()

        openai.api_key = settings.OPENAPI_KEY
        messages = [
            {
                "role": "system",
                "content": CONTEXT_MESSAGE
            },
            {
                "role": "user",
                "content": task.description
            },
        ]

        chat = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages
        )

        result = chat.choices[0].message.content
        task_enhanced, created = TaskEnhancement.objects.get_or_create(
            user=request.user,
            task=task,
        )

        task_enhanced.value = result
        task_enhanced.save()

        response_data = {"result": model_to_dict(task_enhanced)}
    except Tasks.DoesNotExist:
        response_data = {"message": f"Task '{task_id}' does not exist"}
        status = 404
    except (AttributeError, Exception):
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)
