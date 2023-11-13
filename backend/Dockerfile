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

# Install wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Run wait_for_db script and migrate database
CMD ["sh", "-c", "python manage.py wait_for_db && python manage.py migrate"]

# Start Redis server
CMD ["sh", "-c", "wait-for-it.sh db:5432 -- python manage.py wait_for_db && python manage.py migrate"]

# Start Celery worker and beat in separate processes
CMD ["sh", "-c", "wait-for-it.sh redis:6379 -- redis-server & celery -A animal_shelter worker -l INFO & celery -A animal_shelter beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler"]

# Command to start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]