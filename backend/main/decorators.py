from django.contrib.sessions.models import Session
from django.core.management.commands.diffsettings import module_to_dict
from django.shortcuts import redirect


class AuthenticateUserWithDjangoSessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        # redirect user to login page
        if "oauth/google/login" in request.META["PATH_INFO"] or "oauth/google/callback" in request.META["PATH_INFO"]:
            response = self.get_response(request)
        elif "sessionid" not in request.COOKIES:
            return redirect("/oauth/google/login/")
        else:
            # validate if Session is still validate and add user to request
            current_session = Session.objects.get(session_key=request.COOKIES["sessionid"])
            current_session.get_decoded()

            # check django Session of the request
            """
            session = Session.objects.filter(
                # pylint: disable=protected-access
                session_key=request.session._session_key
            ).first()

            session_data = session.get_decoded()
            # let this raise the key error
            #request.user = User.objects.get(id=session_data["_auth_user_id"])
            """
            response = self.get_response(request)


            # Code to be executed for each request/response after
            # the view is called.

        return response