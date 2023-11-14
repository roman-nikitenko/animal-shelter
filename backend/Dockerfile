FROM python:3.11.4-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /code
WORKDIR app/

# Copy the current directory contents into the container at /code
COPY requirements.txt requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

RUN apt-get update \
    && apt-get -y install libpq-dev gcc

# Expose port 8000 for the Django application
EXPOSE 8000

# Run commands to start services
CMD sh -c "\
    python manage.py wait_for_db && \
    python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8000
    celery -A animal_shelter worker -l INFO"
