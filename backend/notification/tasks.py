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
def succes_appoin_notification(user, pet, reservation_date):
    bot = TeleBot(settings.BOT_TOKEN)

    message = f"Your appointment with { pet.name } was created successfully. " \
              f"We will be waiting for you on { reservation_date.date() } at { reservation_date.time() } at our shelter. " \
              f"Thank you and have a nice day!"
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

    appointments_info_list = []

    for appoint in appointments:
        info_dict = {
            "user_email": appoint.user.email,
            "telegram_chat_id": appoint.user.telegram_chat_id,
            "pet_name": appoint.pet.name,
            "visit_datetime": appoint.time.strftime("%H:%M")
        }
        appointments_info_list.append(info_dict)



    for appoint in appointments_info_list:

        message = f"Good day! " \
                  f"We would like to gladly remind you that today at {appoint['visit_datetime']} " \
                  f"you have an appointment with {appoint['pet_name']} at our shelter. We will wait for you! Have a nice day !"

        if appoint["telegram_chat_id"]:
            chat_bot_id = appoint["telegram_chat_id"]
            try:
                bot.send_message(chat_bot_id, message)
            except Exception as e:
                logger.error("Помилка при відправці повідомлення: %s" % str(e))
        else:
            try:
                subject = "Animal shelter notification"
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [appoint["user_email"], ]
                send_mail(subject, message, email_from, recipient_list)
            except Exception as e:
                logger.error("Помилка при відправці повідомлення: %s" % str(e))

    return "success"