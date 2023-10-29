from .models import Notification
from animal_shelter import settings
from telebot import TeleBot

bot = TeleBot(settings.BOT_TOKEN)


@bot.message_handler(func=lambda message: True)
def handle_message(message_data):
    print(message_data)
    chat_id = message_data['message']['chat']['id']
    text = message_data['message']['text'].lower()  # Приводим текст к нижнему регистру для удобства сравнения

    if text == '/start':
        bot.send_message(chat_id, "Enter your veryfi token")
    elif "token: " in text:
        token = text.split("token: ")[1]
        user = Notification.objects.get(telegram_token=token).user
        print(user)

    else:
        bot.send_message(message_data['message']['chat']['id'],
                         "Я не розумію цю команду. Введіть /help для отримання довідки.")
