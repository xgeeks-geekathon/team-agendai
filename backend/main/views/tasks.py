from typing import Any

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication


@require_http_methods(["GET"])
@session_authentication()
def list_all(request: Any) -> JsonResponse:
    """
    WIP

    :param Any request: django request object
    :return:
    """

    return JsonResponse(data={"message": "Im fine thanks"}, status=200)
