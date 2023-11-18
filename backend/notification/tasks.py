from celery import shared_task
from animal_shelter.celery import app
from animal_shelter import settings
from telebot import TeleBot
import logging
from appointment.models import Appointment
from datetime import date
from django.conf import settings
from django.core.mail import send_mail


logger = logging.getLogger(__name__)


@shared_task
def succes_appoin_notification(notification_info):
    bot = TeleBot(settings.BOT_TOKEN)
    telegram_chat_id = notification_info["telegram_chat_id"]
    user_email = notification_info["user_email"]
    pet_name = notification_info["pet_name"]
    reservation_date = notification_info["reservation_date"]
    reservation_time = notification_info["reservation_time"]

    message = f"Your appointment with { pet_name } was created successfully. " \
              f"We will be waiting for you on { reservation_date } at " \
              f"{ reservation_time } at our shelter. " \
              f"Thank you and have a nice day!"
    subject = "Animal shelter appointment"
    if telegram_chat_id:
        try:
            bot.send_message(telegram_chat_id, message)
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
                  f"We would like to gladly remind you that today at " \
                  f"{appoint['visit_datetime']} " \
                  f"you have an appointment with {appoint['pet_name']} " \
                  f"at our shelter. We will wait for you! Have a nice day !"

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
