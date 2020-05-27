from django import template
from django.template.defaulttags import token_kwargs
from allauthdemo.auth.models import Merchant, Location, Product_Category, Product_Items
from allauth.utils import get_request_param
from allauth.socialaccount import providers as social_providers

register = template.Library()



class Search:

    def __init__(self, user):
        self.user = user

    def merchant_search(self):
        existing_merchants = Merchant.objects.filter(user__pk=self.user.pk)
        return existing_merchants

    def location_search(self):
        existing_locations = Location.objects.filter(merchant__pk=self.merchant.pk)
        return existing_locations

    def category_search(self):
        existing_categories = Product_Category.objects.filter(merchant__pk=self.merchant.pk)
        return existing_categories

    def item_search(self):
        existing_items = Product_Items.objects.filter(merchant__pk=self.merchant.pk)
        return existing_items

    def get_all(self):
        existing_merchant = self.merchant_search()
        for merchant in existing_merchant:
            self.merchant = merchant
            existing_locations = self.location_search()
            existing_categories = self.category_search()
            existing_items = self.item_search()

        return {'merchants' : existing_merchant, 'locations' : existing_locations, 'categories' : existing_categories, 'items' : existing_items}



@register.simple_tag
def get_all_data(user):

    existing_entities = Search(user).get_all()
    return existing_entities