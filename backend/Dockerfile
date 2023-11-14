# Use an official Python runtime as a parent image
FROM python:3.11.4

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /code
WORKDIR /code

# Copy the current directory contents into the container at /code
COPY . /code

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Expose port 8000 for the Django application
EXPOSE 8000

# Run commands to start services
CMD sh -c "sleep 10 && \
    service redis-server start && \
    python manage.py wait_for_db && \
    python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8000 & \
    celery -A animal_shelter worker -l INFO & \
    celery -A animal_shelter beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler & \
    celery -A animal_shelter flower --address=0.0.0.0"
