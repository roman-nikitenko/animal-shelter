#!/usr/bin/env bash
# exit on error
set -o errexit
python -m pip install --upgrade pip
pip install -r requirements.txt
mkdir static

python manage.py collectstatic --no-input
python manage.py migrate
celery -A animal_shelter worker --loglevel=info

