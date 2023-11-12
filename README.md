# team-agendai
# Index
- [Frontend](#frontend)
  - [How to run](#how-to-run-front)
- [Backend](#backend)
  - [How to run](#how-to-run)


## <a id="frontend"></a>Frontend

App built in React this will connect to our backend

### <a id="how-to-run"></a>How to run

In order to run this is necessary to provide some credentials that need to be set on a `.env` file on frontend directory

```
VITE__PROJECT_KEY=agendai
VITE__REACT_APP_BASE_URL=http://localhost:3000/
VITE__API_URL=http://localhost:1337
```

## <a id="backend"></a>Backend

Simple API built with Django, this will work with Google OAuth and Jira API, so it's necessary in to set both of them in order to run the project locally

### <a id="how-to-run-front"></a>How to run

In order to run this is necessary to provide some credentials that need to be set on a `.env` file on backend directory

```
DJANGO_SECRET_KEY -> django scret key used to encrypt some data, this is necessary
GOOGLE_SSO_CLIENT_ID -> google Client ID
GOOGLE_SSO_CLIENT_SECRET -> google Client Secret
JIRA_URL -> Jira project url "https://masterblah.atlassian.net/"
JIRA_AUTHENTICATION_EMAIL -> Jira email user API Key
JIRA_AUTHENTICATION_ACCESS_TOKEN -> Jira API key
```

The steps bellow are to unix environments and it's necessary to install `virtualenv` although is not necessary (just skip step 1 and 2)

1. (optional) install virtualenv `virtualenv venv`
2. (optional with step 1) activate env `source venv/bin/activate`
3. install requirements `pip install -r requirements.txt`
4. execute migrations `python manage.py migrate`
5. start django server `python manage.py runserver localhost:1337`

