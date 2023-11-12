from typing import Any

import openai
from django.conf import settings
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

    openai.api_key = settings.OPENAPI_KEY
    messages = [
        {"role": "system", "content": "You are a intelligent assistant, aren't you?!"},
        {"role": "user", "content": "Banana power"},
    ]

    chat = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messages
    )
    reply = chat.choices[0].message.content
    print(f"ChatGPT: {reply}")
    messages.append({"role": "assistant", "content": reply})

    return JsonResponse(data={"messages": messages}, status=200)
