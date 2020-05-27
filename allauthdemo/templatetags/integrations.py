from django import template
from django.template.defaulttags import token_kwargs

from allauthdemo import integrations
from allauth.utils import get_request_param
from allauth.socialaccount import providers as social_providers
from allauthdemo.auth.models import Merchant, Location, Product_Category, Local_Product, Brand
from allauth.socialaccount.models import SocialAccount

register = template.Library()

class ProviderLoginURLNode(template.Node):
    def __init__(self, provider_id, params):
        self.provider_id_var = template.Variable(provider_id)
        self.params = params

    def render(self, context):
        provider_id = self.provider_id_var.resolve(context)
        request = context.get('request')
        provider = integrations.registry.by_id(provider_id, request)
        query = dict([(str(name), var.resolve(context)) for name, var
                      in self.params.items()])
        auth_params = query.get('auth_params', None)
        scope = query.get('scope', None)
        process = query.get('process', None)
        if scope == '':
            del query['scope']
        if auth_params == '':
            del query['auth_params']
        if 'next' not in query:
            next = get_request_param(request, 'next')
            if next:
                query['next'] = next
            elif process == 'redirect':
                query['next'] = request.get_full_path()
        else:
            if not query['next']:
                del query['next']
        # get the login url and append query as url parameters
        return provider.get_login_url(request, **query)


@register.tag
def provider_login_url(parser, token):
    """
    {% provider_login_url "facebook" next=bla %}
    {% provider_login_url "openid" openid="http://me.yahoo.com" next=bla %}
    """
    bits = token.split_contents()
    provider_id = bits[1]
    params = token_kwargs(bits[2:], parser, support_legacy=False)
    return ProviderLoginURLNode(provider_id, params)


class ProvidersMediaJSNode(template.Node):
    def render(self, context):
        request = context['request']
        ret = '\n'.join([p.media_js(request)
                         for p in integrations.registry.get_list(request)])
        return ret


@register.tag
def providers_media_js(parser, token):
    return ProvidersMediaJSNode()


@register.simple_tag
def get_social_accounts(user):
    """
    {% get_social_accounts user as accounts %}
    Then:
        {{accounts.twitter}} -- a list of connected Twitter accounts
        {{accounts.twitter.0}} -- the first Twitter account
        {% if accounts %} -- if there is at least one social account
    """
    accounts = {}
    for account in user.socialaccount_set.all().iterator():
        providers = accounts.setdefault(account.provider, [])
        providers.append(account)
    return accounts


@register.simple_tag
def get_integrations():
    """
    Returns a list of social authentication providers.
    Usage: `{% get_providers as socialaccount_providers %}`.
    Then within the template context, `socialaccount_providers` will hold
    a list of social providers configured for the current site.
    """
    return integrations.registry.get_list()

@register.simple_tag
def get_social_providers():
    """
    Returns a list of social authentication providers.
    Usage: `{% get_providers as socialaccount_providers %}`.
    Then within the template context, `socialaccount_providers` will hold
    a list of social providers configured for the current site.
    """
    integs = []
    social_provs = []

    for element in integrations.registry.get_list():
        integs.append(element.id)

    for pro in social_providers.registry.get_list():
        if pro.id not in integs:
            social_provs.append(pro)

    return social_provs


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
        existing_items = Local_Product.objects.filter(merchant__pk=self.merchant.pk)
        return existing_items

    def get_all(self):
        existing_merchant = self.merchant_search()
        for merchant in existing_merchant:
            self.merchant = merchant
            existing_locations = self.location_search()
            existing_categories = self.category_search()
            existing_items = self.item_search()
        return {'merchants' : existing_merchant, 'locations' : existing_locations, 'categories' : existing_categories, 'items' : existing_items}

    def get_items(self):
        existing_merchant = self.merchant_search()
        for merchant in existing_merchant:
            self.merchant = merchant
            existing_items = self.item_search()
        return existing_items

    def get_categories(self):
        existing_merchant = self.merchant_search()
        for merchant in existing_merchant:
            self.merchant = merchant
            existing_items = self.category_search()
        return existing_categories

    def get_locations(self):
        existing_merchant = self.merchant_search()
        for merchant in existing_merchant:
            self.merchant = merchant
            existing_locations = self.location_search()
        return existing_locations


@register.simple_tag
def get_merchants(user):

    existing_entities = Search(user).merchant_search()
    return list(existing_entities)

@register.simple_tag
def get_locations(user):

    existing_entities = Search(user).get_locations()
    return existing_entities

@register.simple_tag
def get_categories(user):

    existing_entities = Search(user).get_categories()
    return existing_entities

@register.simple_tag
def get_items(user):

    existing_entities = list(Search(user).get_items())
    all_locations = []
    for loc in list(Search(user).get_locations()):
        all_locations.append(loc.name)
    all_locations = all_locations.sort()
    
    row_id = 0    

    table_item_data = []
    for item in existing_entities:
        try:
            image = existing_entities.images[0]
        except:
            image = '/static/assets/img/img-placeholder.png'

        available_at = []
        for location in list(item.location_ids.all()):
            available_at.append(location.name)
        if available_at.sort() == all_locations:
            item_locations = 'All Locations'
        else:
            item_locations = '\n'.join(available_at)
            item_locations = (item_locations[:25] + '..') if len(item_locations) > 25 else item_locations

        price = item.price

        row_id += 1

        row_id_as_string = "variation_row_{}".format(row_id)


        data = {'name' : item.name, 'location' : item_locations, 'image' : image, 'category' : item.category_id, 'price' : price, 'row_id' : row_id_as_string}
        table_item_data.append(data)
    return table_item_data


@register.simple_tag
def get_user_integrations(user):

    search_results = SocialAccount.objects.filter(user__pk=user.pk)
    current_integrations = []

    for integration in search_results:
        current_integrations.append(integration.provider)

    return ', '.join(current_integrations)



@register.simple_tag
def get_brand_logo(brand):
    logo = {
    'Square' : 'https://images.ctfassets.net/2d5q1td6cyxq/2SqLXL2zJmcUUI2QSkUCy6/71701594cb1fdf6f2e60d34297262d6b/square.01.jpg',
    'Izettle' : 'https://press.izettle.com/sv/wp-content/uploads/sites/3/2018/05/ize-og-4.jpg',
    'Vend' : 'https://www.vendhq.com/images/internal/identity/logo/logo-standard-green.png',
    'Shopify' : 'https://cdn.shopify.com/assets2/brand-assets/glyph-sample-square-c19c11377a93759183e4b05084ea0a2d63b74b26bc96e0d9f73f5173bbb155e2.svg'
    }
    print(logo[str(brand)])
    return logo[str(brand)]