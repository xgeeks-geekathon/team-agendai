from typing import Any

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication
from main.utils import model_to_dict


@require_http_methods(["GET"])
@session_authentication()
def me(request: Any) -> JsonResponse:
    """
    Return user information, from Profile model.

    :param Any request: django request object
    :return:
    """

    return JsonResponse(data=model_to_dict(request.user, exclude=["password"]), status=200)
