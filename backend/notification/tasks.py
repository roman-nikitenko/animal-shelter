from celery import shared_task
from animal_shelter import settings
from telebot import TeleBot
import logging

logger = logging.getLogger(__name__)

@shared_task
def your_celery_task():
    bot = TeleBot(settings.BOT_TOKEN)
    try:
        logger.info("Початок відправки повідомлення")
        bot.send_message(395907153, "Kurwaaaaaaaaaaaaaaaaaaa")
        logger.info("Повідомлення успішно відправлено")
    except Exception as e:
        logger.error("Помилка при відправці повідомлення: %s" % str(e))
