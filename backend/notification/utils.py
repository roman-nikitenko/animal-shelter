from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from telegram import Update
from telegram.ext import CallbackContext
from animal_shelter import settings
from telegram import Bot


def initialize_telegram_bot(token):
    return Bot(token=token)


def handle_telegram_update(request):
    # Initialize the Telegram bot
    bot = initialize_telegram_bot(settings.BOT_TOKEN)

    # Create a dictionary to store the user's state
    user_state = {}

    update = Update.de_json(request.data, bot)

    chat_id = update.message.chat_id
    message = update.message.text

    if message == "/start":
        response = "Welcome to the bot! Please answer this question: What is your favorite color?"
        # Set the user's state to 'awaiting_color' to expect their response
        user_state[chat_id] = 'awaiting_color'
    else:
        if chat_id in user_state and user_state[chat_id] == 'awaiting_color':
            # Print the user's answer on the server
            print(f"User's favorite color: {message}")
            user_state.pop(chat_id)  # Remove the user's state
            response = f"Your favorite color is set to: {message}"
        else:
            response = f"You said: {message}"

    bot.send_message(chat_id=chat_id, text=response)
