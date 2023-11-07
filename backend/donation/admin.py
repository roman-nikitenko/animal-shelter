from django.contrib import admin

from .models import Donation, Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "status", "donation_id", "user_id", "money_to_pay")
    list_filter = ("status",)
    search_fields = ("donation_id", "user_id")


admin.site.register(Donation)
