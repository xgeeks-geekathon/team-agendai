from django.conf import settings
from jira import JIRA


class JiraSingleton:
    """
    Singleton class that store Jira authentication.
    """

    __instance = None

    class Implementation:
        client = None

        def __init__(self):
            self.set_client()

        @classmethod
        def set_client(cls) -> None:
            """
            Authenticate Jira and set the client to attribute client to use it later.

            :return:
            """

            cls.client = JIRA(
                options={"server": settings.JIRA_URL},
                basic_auth=(
                    settings.JIRA_AUTHENTICATION_EMAIL,
                    settings.JIRA_AUTHENTICATION_ACCESS_TOKEN
                )
            )

    def __init__(self):
        """ Create singleton instance """
        # Check whether we already have an instance
        if JiraSingleton.__instance is None:
            # Create and remember instance
            JiraSingleton.__instance = JiraSingleton.Implementation()

        # Store instance reference as the only member in the handle
        self.__dict__["_Singleton__instance"] = JiraSingleton.__instance

    def __getattr__(self, attr):
        """ Delegate access to implementation """
        return getattr(self.__instance, attr)

    def __setattr__(self, attr, value):
        """ Delegate access to implementation """
        return setattr(self.__instance, attr, value)
