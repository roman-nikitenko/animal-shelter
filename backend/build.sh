#!/usr/bin/env bash
# exit on error
set -o errexit
python -m pip install --upgrade pip
pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

docker build -t animal-shelter .
docker network create happy_paws
docker run -d --name db --network happy_paws -v $(pwd)/data/db:/var/lib/postgresql/data -e POSTGRES_USER=amirammina -e POSTGRES_PASSWORD=TfvK9rgcbWk0 postgres
docker run -d --name redis --network happy_paws redis:alpine
docker run -d --name web --network happy_paws -p 8000:8000 -v $(pwd):/code --env-file .env animal-shelter
docker run -d --name celery --network happy_paws --env-file .env animal-shelter sh -c 'celery -A animal_shelter worker -l INFO'
docker run -d --name celery-beat --network happy_paws --env-file .env animal-shelter sh -c 'celery -A animal_shelter beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler'
docker run -d --name flower --network happy_paws -p 5555:5555 --env-file .env animal-shelter sh -c 'celery -A animal_shelter flower --address=0.0.0.0'
docker logs web
#docker-compose up --build
#celery -A animal_shelter worker --loglevel=info

