FROM python:3.9

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y python3-venv

RUN python3 -m venv venv

RUN . venv/bin/activate 

COPY . ./

RUN pip install -r requirements.txt

RUN python3 manage.py migrate

CMD ["python3", "manage.py", "runserver", "localhost:1337"]