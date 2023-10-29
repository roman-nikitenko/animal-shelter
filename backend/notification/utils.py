from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from animal_shelter import settings
from telebot import TeleBot

bot = TeleBot(settings.BOT_TOKEN)
@bot.message_handler(func=lambda message: True)
def handle_message(message_data):
    print(message)
    # Перевірте, чи правильно визначена змінна message і чи передається вона до цієї функції
    text = message_data['message']['text'].lower()  # Приводим текст к нижнему регистру для удобства сравнения

    if text == '/start':
        bot.send_message(message_data['message']['chat']['id'], "Ласкаво просимо! Я ваш бот. Чим я можу допомогти?")
    elif text == '/help':
        bot.send_message(message_data['message']['chat']['id'],
                         "Це бот для чогось. Ось доступні команди:\n/start - почати\n/help - отримати довідку")
    else:
        bot.send_message(message_data['message']['chat']['id'],
                         "Я не розумію цю команду. Введіть /help для отримання довідки.")
