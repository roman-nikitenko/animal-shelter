from celery import shared_task
from animal_shelter.celery import app
from animal_shelter import settings
from telebot import TeleBot
import logging
from appointment.models import Appointment
from datetime import date
from user.models import User
from django.conf import settings
from django.core.mail import send_mail


logger = logging.getLogger(__name__)

@shared_task
def send_message_to_tg():
    bot = TeleBot(settings.BOT_TOKEN)
    try:
        bot.send_message(395907153, "Test")
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