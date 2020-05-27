from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
# from django.utils.html import format_html_join
# from django.utils.safestring import mark_safe
# from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _

try:
    from django.utils.encoding import force_text
except ImportError:
    from django.utils.encoding import force_unicode as force_text

from .models import User, UserProfile, Product_Category, Location, Merchant, Presence, Local_Product, Brand
from .forms import UserAdminForm
# from django.contrib.sites.models import Site

# Site.objects.create(pk=1, domain='localhost', name='localhost')



admin.site.register(Merchant)
admin.site.register(Product_Category)
# admin.site.register(Presence)
# admin.site.register(Location)
# admin.site.register(Product_Items)


class PresenceInLine(admin.TabularInline):
    model = Presence

class LocationAdmin(admin.ModelAdmin):
    inlines = (PresenceInLine,)

class Local_ProductAdmin(admin.ModelAdmin):
    inlines = (PresenceInLine,)

admin.site.register(Location, LocationAdmin)
admin.site.register(Local_Product, Local_ProductAdmin)
admin.site.register(Brand)

class UserProfileAdmin(admin.ModelAdmin):
    search_fields = ('user', 'dob')
    ordering = ('user',)
    list_select_related = ('user',)


admin.site.register(UserProfile, UserProfileAdmin)


class UserProfileAdminInline(admin.TabularInline):
    model = UserProfile


class UserAdmin(DjangoUserAdmin):
    """The project uses a custom User model, so it uses a custom User admin model.

    Some related notes at:
    https://github.com/dabapps/django-email-as-username/blob/master/emailusernames/admin.py

    And:
    .../lib/python2.7/site-packages/django/contrib/auth/admin.py
    """

    inlines = [
        UserProfileAdminInline,
    ]

    # readonly_fields = ('private_uuid', 'public_id')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'display_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
        'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        # (_('Ids'), {'fields': ('private_uuid', 'public_id')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
        ),
    )
    list_display = ('email', 'first_name', 'last_name', 'display_name', 'is_staff')
    search_fields = ('first_name', 'last_name', 'display_name', 'email')
    ordering = ('email',)

    form = UserAdminForm

admin.site.register(User, UserAdmin)




# class SocialTokenAdmin(admin.ModelAdmin):
#     raw_id_fields = ('app', 'account',)
#     list_display = ('app', 'account', 'truncated_token', 'expires_at', 'domain_prefix',)
#     list_filter = ('app', 'app__provider', 'expires_at', 'domain_prefix')

#     def truncated_token(self, token):
#         max_chars = 40
#         ret = token.token
#         if len(ret) > max_chars:
#             ret = ret[0:max_chars] + '...(truncated)'
#         return ret
#     truncated_token.short_description = 'Token'

