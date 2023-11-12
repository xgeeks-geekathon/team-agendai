import datetime
from itertools import chain
from typing import Any

from django.contrib.auth.models import User


def model_to_dict(instance: "User", fields: list = None, exclude: list = None) -> dict:
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


def explore_nested_object(
        obj: Any,
        path: str,
        splitter: str = ".",
        set_value: bool = False,
        value_to_set: Any = None,
        update_value: bool = False
) -> Any:
    """
    Explores obj recursively and allow to return value or set a new value in found path. This will search for keys,
    indexes and attributes at object.

    :param dict obj: object to explore
    :param str path: path to retrieve
    :param str splitter: String to split the dictionary attribute names
    :param bool set_value: Flag to set value
    :param bool update_value: Flag to update on the path instead of set, this will ignore set_value flag
    :param Any value_to_set: Value to set on given path
    :return: value found at path or None if path is invalid
    """

    paths = path.split(splitter)
    path = paths.pop(0)

    # Get path as an attribute
    # note, some dicts can have the key items but the getattr is grabbing the function if the object is a dict, so there
    # is the need to cover it
    value = getattr(obj, path, None) if path not in ["items", "get"] else None

    # Get path as a dict key
    if value is None and isinstance(obj, dict) and getattr(obj, "get", False):
        value = obj.get(path)

    # Get path as a list index
    if value is None:
        try:
            value = obj[int(path)]
        except (ValueError, TypeError, IndexError):
            pass

    if len(paths) == 0:
        # if is to set value, update key with value_to_set and return updated obj
        if update_value:
            obj[path].update(value_to_set)
        elif set_value:
            obj[path] = value_to_set

        return value

    return explore_nested_object(
        obj=value,
        path=splitter.join(paths),
        splitter=splitter,
        set_value=set_value,
        value_to_set=value_to_set
    )