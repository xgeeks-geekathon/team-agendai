import datetime
from itertools import chain
from typing import Any

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


#@login_required(login_url="oauth/google/login/")
@require_http_methods(["GET", "POST"])
def me(request: Any):
    """

    :param request:
    :return:
    """

    # get user information
    # for now is just the first to help the evolution of the code

    return JsonResponse(data={"data": model_to_dict(User.objects.first(), exclude=["password"])}, status=200)


def model_to_dict(instance:"User", fields:list=None, exclude:list=None) -> dict:
    """
    Return a dict containing the data in ``instance`` suitable for passing as
    a Form's ``initial`` keyword argument.

    ``fields`` is an optional list of field names. If provided, return only the
    named.

    ``exclude`` is an optional list of field names. If provided, exclude the
    named from the returned dict, even if they are listed in the ``fields``
    argument.
    """

    opts = instance._meta
    data = {}
    for f in chain(opts.concrete_fields, opts.private_fields, opts.many_to_many):
        if not getattr(f, "editable", False):
            continue
        if fields is not None and f.name not in fields:
            continue
        if exclude and f.name in exclude:
            continue

        new_value = f.value_from_object(instance)
        if isinstance(new_value, datetime.datetime):
            new_value = new_value.isoformat()

        data[f.name] = new_value

    return data