from functools import wraps

from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.shortcuts import redirect
from django.urls import reverse


def session_authentication():
    """
    Decorator to check if the request have a current session id and add the user to the request.

        @session_authentication()
        def my_view(request):
            # request.user => should contain an authenticated user
            # ...

    In case of error it will redirect to the authentication login
    """

    def decorator(func):
        @wraps(func)
        def inner(request, *args, **kwargs):
            if "sessionid" not in request.COOKIES:
                return redirect(reverse("oauth-google-sso:oauth_start_login"))

            current_session = Session.objects.filter(session_key=request.COOKIES["sessionid"]).first()

            if current_session:
                session_dict = current_session.get_decoded()
                request.user = User.objects.get(id=session_dict["_auth_user_id"])

            return func(request, *args, **kwargs)
        return inner
    return decorator