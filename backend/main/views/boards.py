import logging
from typing import Any

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication
from main.models import Boards
from main.utils import model_to_dict

LOGGER = logging.getLogger("console")


@require_http_methods(["GET"])
@session_authentication()
def list_all(request: Any) -> JsonResponse:
    """
    List boards per user

    :param Any request: django request object
    :return:
    """

    try:
        response_data = {
            "message": "Events fetched with success",
            "data": [model_to_dict(item) for item in Boards.objects.filter(user=request.user)]
        }
        status = 200
    except (AttributeError, Exception) as error:
        LOGGER.error(error)
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)


@require_http_methods(["POST"])
@session_authentication()
def create(request: Any) -> JsonResponse:
    """
    Create a new board

    :param Any request: django request object
    :return:
    """

    try:
        board, created = Boards.objects.get_or_create(user=request.user, name=request.POST.get("name") or "Board 1")
        response_data = {
            "message": "Boards created/fetch with success",
            "data": model_to_dict(board)
        }

        status = 200 if not created else 201
    except (AttributeError, Exception) as error:
        LOGGER.error(error)
        response_data = {"message": "Something went wrong during the process"}
        status = 400

    return JsonResponse(data=response_data, status=status)
