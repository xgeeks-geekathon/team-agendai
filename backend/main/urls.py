"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from main.views import auth, boards, events, tasks, tasks_enhancement

boards_urls = (
    [
        path("", boards.list_all, name="list"),
    ],
    "boards"
)

events_urls = (
    [
        path("", events.list_all, name="list"),
    ],
    "events"
)
tasks_urls = (
    [
        path("", tasks.list_all, name="list"),
    ],
    "tasks"
)

tasks__enhancement_urls = (
    [
        path("", tasks_enhancement.list_all, name="list"),
    ],
    "tasks-enhancement"
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("oauth/google/", include("django_google_sso.urls", namespace="oauth-google-sso")),
    path("me/",auth.me, name="auth-me"),
    path("boards/", include(boards_urls, namespace="boards")),
    path("events/", include(events_urls, namespace="events")),
    path("tasks/", include(tasks_urls, namespace="tasks")),
    path("tasks-enhancement/", include(tasks_urls, namespace="tasks-enhancement")),
]
