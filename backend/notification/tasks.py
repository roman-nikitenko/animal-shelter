from celery import shared_task
from animal_shelter.celery import app
from animal_shelter import settings
from telebot import TeleBot
import logging
from appointment.models import Appointment
from datetime import date
from user.models import User
from pets.models import Pet
from django.conf import settings
from django.core.mail import send_mail


logger = logging.getLogger(__name__)

@shared_task
def succes_appoin_notification(user_id, pet_id, reservation_date):
    bot = TeleBot(settings.BOT_TOKEN)

    user = User.objects.filter(id=user_id)
    pet = Pet.objects.filter(id=pet_id)

    message = f"Hello, successful reservation visit with pet {pet.name} " \
              f"your visit planing {reservation_date}"
    subject = "Animal shelter appointment"
    telegram_chat_id = user.telegram_chat_id
    if telegram_chat_id:
        try:
            bot.send_message(chat_bot_id, message)
        except Exception as e:
            logger.error("Помилка при відправці повідомлення: %s" % str(e))
    else:
        try:
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [user_email, ]
            send_mail(subject, message, email_from, recipient_list)
        except Exception as e:
            logger.error("Помилка при відправці повідомлення: %s" % str(e))


@app.task
def notification_period_task():
    bot = TeleBot(settings.BOT_TOKEN)

    appointments = Appointment.objects.filter(time__date=date.today())
    users_id_list = [appointment.user_id for appointment in appointments]
    users = User.objects.filter(id__in=users_id_list)
    telegram_chat_ids = [(user.telegram_chat_id, user.email) for user in users]

    for chat_bot_id, user_email in telegram_chat_ids:
        if chat_bot_id:
            try:
                bot.send_message(chat_bot_id, "Hello, I remind you about today's visit to the shelter")
            except Exception as e:
                logger.error("Помилка при відправці повідомлення: %s" % str(e))
        else:
            try:
                subject = "Animal shelter notification"
                message = "Hello, I remind you about today's visit to the shelter"
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [user_email, ]
                send_mail(subject, message, email_from, recipient_list)
            except Exception as e:
                logger.error("Помилка при відправці повідомлення: %s" % str(e))


    return "success"