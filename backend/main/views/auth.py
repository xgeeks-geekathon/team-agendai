from typing import Any

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.http import require_http_methods

from main.decorators import session_authentication
from main.utils import model_to_dict


@require_http_methods(["GET"])
@session_authentication()
def me(request: Any) -> JsonResponse:
    """
    Return user information, from User and Profile models.

    :param Any request: django request object
    :return:
    """

    user_information = model_to_dict(request.user, exclude=["password"])
    user_information.update(model_to_dict(request.user.profile, exclude=["google_access_token"]))

    return JsonResponse(data=user_information, status=200)


@require_http_methods(["GET"])
@session_authentication()
def register(__: Any) -> JsonResponse:
    """
    Dummy endpoint to redirect to FE

    :param Any __: django request object
    :return:
    """

    return redirect(settings.FRONT_AUTH_REDIRECT)
