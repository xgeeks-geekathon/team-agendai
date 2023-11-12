from typing import Any

from django.http import JsonResponse
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
def register(request: Any) -> JsonResponse:
    """
    Register user

    :param Any request: django request object
    :return:
    """

    from django.contrib.sessions.models import Session
    session = Session.objects.get(session_key=request.COOKIES["sessionid"]).get_decoded()

    from main.models.profile import Profile
    profile, created = Profile.objects.get_or_create(user=request.user)
    if not created:
        profile.google_access_token = session["google_sso_access_token"]
        profile.save()
        status = 201
    else:
        status = 200

    user_information = model_to_dict(request.user, exclude=["password"])
    user_information.update(model_to_dict(request.user.profile, exclude=["google_access_token"]))

    return JsonResponse(data=user_information, status=status)
