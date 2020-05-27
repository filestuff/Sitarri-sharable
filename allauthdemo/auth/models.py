import hashlib
import uuid

from django.contrib.postgres.fields import ArrayField

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.core.mail import send_mail
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from django.utils.http import urlquote
from django.utils.translation import ugettext_lazy as _

try:
    from django.utils.encoding import force_text
except ImportError:
    from django.utils.encoding import force_unicode as force_text
from allauth.account.signals import user_signed_up

from allauth.socialaccount.models import *


class MyUserManager(UserManager):
    """
    Custom User Model manager.

    It overrides default User Model manager's create_user() and create_superuser,
    which requires username field.
    """

    def create_user(self, email, password=None, **kwargs):
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **kwargs):
        user = self.model(email=email, is_staff=True, is_superuser=True, **kwargs)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User instances represent a user on this site.

    Important: You don't have to use a custom user model. I did it here because
    I didn't want a username to be part of the system and I wanted other data
    to be part of the user and not in a separate table. 

    You can avoid the username issue without writing a custom model but it
    becomes increasingly obtuse as time goes on. Write a custom user model, then
    add a custom admin form and model.

    Remember to change ``AUTH_USER_MODEL`` in ``settings.py``.
    """

    email = models.EmailField(_('email address'), blank=False, unique=True)
    first_name = models.CharField(_('first name'), max_length=40, blank=True, null=True, unique=False)
    last_name = models.CharField(_('last name'), max_length=40, blank=True, null=True, unique=False)
    display_name = models.CharField(_('display name'), max_length=14, blank=True, null=True, unique=False)
    is_staff = models.BooleanField(_('staff status'), default=False,
                                   help_text=_('Designates whether the user can log into this admin site.'))
    is_active = models.BooleanField(_('active'), default=True,
                                    help_text=_('Designates whether this user should be treated as '
                                                'active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        db_table = 'auth_user'
        abstract = False

    def get_absolute_url(self):
        # TODO: what is this for?
        return "/users/%s/" % urlquote(self.email)  # TODO: email ok for this? better to have uuid?

    @property
    def name(self):
        if self.first_name:
            return self.first_name
        elif self.display_name:
            return self.display_name
        return 'You'

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def guess_display_name(self):
        """Set a display name, if one isn't already set."""
        if self.display_name:
            return

        if self.first_name and self.last_name:
            dn = "%s %s" % (self.first_name, self.last_name[0])  # like "Andrew E"
        elif self.first_name:
            dn = self.first_name
        else:
            dn = 'You'
        self.display_name = dn.strip()

    def email_user(self, subject, message, from_email=None):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email])

    def __str__(self):
        return self.email

    def natural_key(self):
        return (self.email,)


# @python_2_unicode_compatible
class UserProfile(models.Model):
    """Profile data about a user.
    Certain data makes sense to be in the User model itself, but some
    is more "profile" data than "user" data. I think this is things like
    date-of-birth, favourite colour, etc. If you have domain-specific
    profile information you might create additional profile classes, like
    say UserGeologistProfile.
    """
    user = models.OneToOneField(User, primary_key=True, verbose_name='user', related_name='profile',
                                on_delete=models.CASCADE)

    # I oscillate between whether the ``avatar_url`` should be
    # a) in the User model
    # b) in this UserProfile model
    # c) in a table of it's own to track multiple pictures, with the
    #    "current" avatar as a foreign key in User or UserProfile.
    avatar_url = models.CharField(max_length=256, blank=True, null=True)

    dob = models.DateField(verbose_name="dob", blank=True, null=True)

    def __str__(self):
        return force_text(self.user.email)

    class Meta():
        db_table = 'user_profile'


@receiver(user_signed_up)
def set_initial_user_names(request, user, sociallogin=None, **kwargs):
    """
    When a social account is created successfully and this signal is received,
    django-allauth passes in the sociallogin param, giving access to metadata on the remote account, e.g.:
 
    sociallogin.account.provider  # e.g. 'twitter' 
    sociallogin.account.get_avatar_url()
    sociallogin.account.get_profile_url()
    sociallogin.account.extra_data['screen_name']
 
    See the socialaccount_socialaccount table for more in the 'extra_data' field.

    From http://birdhouse.org/blog/2013/12/03/django-allauth-retrieve-firstlast-names-from-fb-twitter-google/comment-page-1/
    """

    preferred_avatar_size_pixels = 256

    picture_url = "http://www.gravatar.com/avatar/{0}?s={1}".format(
        hashlib.md5(user.email.encode('UTF-8')).hexdigest(),
        preferred_avatar_size_pixels
    )

    if sociallogin:
        # Extract first / last names from social nets and store on User record
        if sociallogin.account.provider == 'twitter':
            name = sociallogin.account.extra_data['name']
            user.first_name = name.split()[0]
            user.last_name = name.split()[1]

        if sociallogin.account.provider == 'facebook':
            user.first_name = sociallogin.account.extra_data['first_name']
            user.last_name = sociallogin.account.extra_data['last_name']
            # verified = sociallogin.account.extra_data['verified']
            picture_url = "http://graph.facebook.com/{0}/picture?width={1}&height={1}".format(
                sociallogin.account.uid, preferred_avatar_size_pixels)

        if sociallogin.account.provider == 'google':
            user.first_name = sociallogin.account.extra_data['given_name']
            user.last_name = sociallogin.account.extra_data['family_name']
            # verified = sociallogin.account.extra_data['verified_email']
            picture_url = sociallogin.account.extra_data['picture']

    profile = UserProfile(user=user, avatar_url=picture_url)
    profile.save()

    user.guess_display_name()
    user.save()



class MyUserManager(UserManager):
    """
    Custom User Model manager.

    It overrides default User Model manager's create_user() and create_superuser,
    which requires username field.
    """

    def create_user(self, email, password=None, **kwargs):
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **kwargs):
        user = self.model(email=email, is_staff=True, is_superuser=True, **kwargs)
        user.set_password(password)
        user.save()
        return user


# class Domain_Prefix(models.Model):

#     social_account_token = models.OneToOneField(SocialToken, on_delete=models.CASCADE, parent_link=True)
#     domainprefix = models.TextField(default='', verbose_name=_('domain_prefix'), help_text=_('for some APIs only'))


#     def __str__(self):
#         return self.domainprefix

#     class Meta():
#         db_table = 'Domain_Prefix'


DEFAULT_USER_ID = 'ADMIN'
class Merchant(models.Model):

    user = models.ForeignKey(User, primary_key=False, verbose_name='user', blank=True, null=True,  on_delete=models.SET_NULL, default=DEFAULT_USER_ID)

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    integration_id = models.CharField(help_text=_('id from the integration provider'), max_length=100, null=True)

    shopping_method = JSONField(verbose_name=_('shopping_method'), default=dict)

    name = models.CharField(max_length=100, null=True)

    providers = ArrayField(models.CharField(max_length=200), blank=True, null=True, default=list)

    last_modified = models.DateTimeField(verbose_name=_('last modified'),
                                      auto_now=True)
    date_created = models.DateTimeField(verbose_name=_('date created'),
                                       auto_now_add=True)

    class Meta:
        verbose_name = _('Merchant')
        verbose_name_plural = _('Merchants')

    def __str__(self):
        return self.name



class Location(models.Model):

	# identifiers

	uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

	integration_id = models.CharField(help_text=_('id from the integration provider'), max_length=200, null=True)

	merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE, blank=True, null=True)

	# descriptors

	name = models.CharField(max_length=200)

	description = models.CharField(max_length=800, null=True)

	merchant_type = models.CharField(max_length=200, null=True)

	currency = models.CharField(max_length=200, null=True)

	price_category = JSONField(verbose_name=_('price_category'), default=dict)

	tags = ArrayField(models.CharField(max_length=200), blank=True, null=True, default=list)

	online_store = models.BooleanField(default=False)

	offline_store = models.BooleanField(default=True)

	# contact info

	phone_number = models.CharField(max_length=15, null=True)

	street_address_1 = models.CharField(max_length=200, null=True)

	street_address_2 = models.CharField(max_length=200, null=True)

	post_code = models.CharField(max_length=200, null=True)

	city = models.CharField(max_length=200, null=True)

	country_code = models.CharField("ISO Country Code", max_length=3, null=True)

	latitude =  models.FloatField(max_length=200, null=True)

	longitude = models.FloatField(max_length=200, null=True)

	website = models.URLField(max_length=200, null=True)

	instagram = models.URLField(max_length=200, null=True)

	facebook = models.URLField(max_length=200, null=True)

	twitter = models.URLField(max_length=200, null=True)

	operational_times = JSONField(verbose_name=_('operational_times'), default=dict)

	# media

	logo = models.URLField(max_length=200, null=True)

	primary_image = models.URLField(max_length=400, null=True)

	images = ArrayField(models.URLField(max_length=400, null=True), blank=True, null=True, default=list)

	# google

	google_place_id = models.CharField(max_length=200, null=True)

	google_place_url = models.URLField(max_length=200, null=True)

	google_rating_value = models.FloatField(max_length=4, null=True)

	google_rating_volume = models.IntegerField(null=True)

	# deliveroo

	deliveroo_url = models.URLField(max_length=200, null=True)

	deliveroo_rating_value = models.FloatField(max_length=4, null=True)

	deliveroo_rating_volume = models.IntegerField(null=True)

	# ubereats

	ubereats_url = models.URLField(max_length=200, null=True)

	ubereats_rating_value = models.FloatField(max_length=4, null=True)

	ubereats_rating_volume = models.IntegerField(null=True)

	# others

	website_text = models.TextField(max_length=8192)

	last_modified = models.DateTimeField(verbose_name=_('last modified'),
	                                  auto_now=True)
	date_created = models.DateTimeField(verbose_name=_('date created'),
	                                   auto_now_add=True)

	class Meta:
		verbose_name = _('Location')
		verbose_name_plural = _('Locations')

	def __str__(self):
		return self.name




class Brand(models.Model):

	uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

	name = models.CharField(max_length=100)

	description = models.CharField(max_length=200, null=True, blank=True)

	logo = models.URLField(max_length=200, null=True)

	website = models.URLField(max_length=200, null=True)

	last_modified = models.DateTimeField(verbose_name=_('last modified'), auto_now=True)

	date_created = models.DateTimeField(verbose_name=_('date created'), auto_now_add=True)

	class Meta:
		verbose_name = _('Brand')
		verbose_name_plural = _('Brands')

	def __str__(self):
		return self.name



class Product_Category(models.Model):

	uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

	integration_id = models.CharField(help_text=_('id from the integration provider'), max_length=100, null=True)

	merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE, blank=True, null=True)

	name = models.CharField(max_length=100)

	sort_order = models.IntegerField(default=1)

	last_modified = models.DateTimeField(verbose_name=_('last modified'),
	                                  auto_now=True)
	date_created = models.DateTimeField(verbose_name=_('date created'),
	                                   auto_now_add=True)

	class Meta:
		verbose_name = _('Product Category')
		verbose_name_plural = _('Product Categories')

	def __str__(self):
		return self.name


DEFAULT_LOCATION_ID = 'ADMIN'
DEFAULT_MECHANT_ID = 'ADMIN'
DEFAULT_MEASUREMENT_UNITS = 'Per Item'

measurement_unit_choices = ['Per Item', 'Per Hour', 'Per Liter', 'Per Ounce', 'Per Meter', 'Per Kilogram']


class Local_Product(models.Model):

	# Identifiers

	uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

	integration_id = models.CharField(help_text=_('id from the integration provider'), max_length=100, null=True)

	# Connections

	merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE, blank=True, null=True)

	category_id = models.ForeignKey(Product_Category, on_delete=models.CASCADE, blank=True, null=True)

	brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, blank=True, null=True)

	location_ids = models.ManyToManyField(Location, through='Presence', blank=True, verbose_name=_('present at'), default=None)

	# Organisation

	available = models.BooleanField(default=True)

	sort_order = models.IntegerField(default=1)

	# Descriptors

	name = models.CharField(max_length=100)

	description = models.CharField(max_length=800, null=True)

	price = models.CharField(max_length=200, null=True)

	price_min = models.FloatField(max_length=8, null=True)

	price_max = models.FloatField(max_length=8, null=True)

	discounted_price = models.CharField(max_length=200, null=True)

	measurement_units = models.CharField(max_length=200, null=True)

	tags = ArrayField(models.CharField(max_length=200, blank=True), blank=True, null=True, default=list)

	# Media

	primary_image = models.URLField(max_length=400, null=True)

	images = ArrayField(models.URLField(max_length=400, null=True), blank=True, null=True, default=list)

	# links

	product_url = models.URLField(max_length=200, null=True)

	# Other

	last_modified = models.DateTimeField(verbose_name=_('last modified'),
	                                  auto_now=True)
	date_created = models.DateTimeField(verbose_name=_('date created'),
	                                   auto_now_add=True)

	class Meta:
		verbose_name = _('Local Product')
		verbose_name_plural = _('Local Products')

	def __str__(self):
		return self.name



class Presence(models.Model):
	product = models.ForeignKey(Local_Product, on_delete=models.CASCADE)
	location = models.ForeignKey(Location, on_delete=models.CASCADE)