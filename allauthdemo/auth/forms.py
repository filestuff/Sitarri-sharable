from __future__ import absolute_import
from django import forms

from .models import User

from django import forms

from allauth.account.forms import BaseSignupForm

from allauth.socialaccount import app_settings, signals
from allauth.socialaccount.adapter import get_adapter
from allauth.socialaccount.models import SocialAccount

from allauthdemo.auth.models import Merchant, Location, Product_Category, Local_Product, Brand


class UserEditForm(forms.ModelForm):
    """Form for viewing and editing name fields in a User object.

    A good reference for Django forms is:
    http://pydanny.com/core-concepts-django-modelforms.html
    """

    def __init__(self, *args, **kwargs):
        # TODO: this doesn't seem to work. Need to get to the bottom of it.
        super().__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'display_name')


class UserAdminForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'display_name', 'is_staff', 'is_active', 'date_joined')

    def is_valid(self):
        return super().is_valid()




class SignupForm(BaseSignupForm):

    def __init__(self, *args, **kwargs):
        self.sociallogin = kwargs.pop('sociallogin')
        initial = get_adapter().get_signup_form_initial_data(
            self.sociallogin)
        kwargs.update({
            'initial': initial,
            'email_required': kwargs.get('email_required',
                                         app_settings.EMAIL_REQUIRED)})
        super(SignupForm, self).__init__(*args, **kwargs)

    def save(self, request):
        adapter = get_adapter(request)
        user = adapter.save_user(request, self.sociallogin, form=self)
        self.custom_signup(request, user)
        return user

    def validate_unique_email(self, value):
        try:
            return super(SignupForm, self).validate_unique_email(value)
        except forms.ValidationError:
            raise forms.ValidationError(
                get_adapter().error_messages['email_taken']
                % self.sociallogin.account.get_provider().name)


class IntegrationForm(forms.Form):
    account = forms.ModelChoiceField(queryset=SocialAccount.objects.none(),
                                     widget=forms.Select,
                                     required=True)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request')
        self.accounts = SocialAccount.objects.filter(user=self.request.user)
        super(IntegrationForm, self).__init__(*args, **kwargs)
        self.fields['account'].queryset = self.accounts


    def clean(self):
        cleaned_data = super(IntegrationForm, self).clean()
        account = cleaned_data.get('account')
        if account:
            get_adapter(self.request).validate_disconnect(
                account,
                self.accounts)
        return cleaned_data

    def save(self):
        account = self.cleaned_data['account']
        account.delete()
        signals.social_account_removed.send(sender=SocialAccount,
                                            request=self.request,
                                            socialaccount=account)




class ProductForm(forms.Form):
    name = forms.CharField(
        max_length=30,
        widget=forms.TextInput(
            attrs={
                'class': 'form-control'
            }),
        )
    description = forms.EmailField(
        max_length=254,
        widget=forms.Textarea(
            attrs={
                'class': 'form-control'
            }),)
    price = forms.CharField(
        max_length=2000,
        widget=forms.Textarea(
            attrs={
                'class': 'form-control'
            }),
        help_text='Write here your message!'
    )
    # measurement_units = forms.ChoiceField(
    #     max_length=50,              
    #     widget=forms.Select(
    #         choices=['Per Item', 'Lb', ],
    #         attrs={

    #         }
    #         )
    # )

    availability = forms.CharField(       # A hidden input for internal use
        max_length=50,              # tell from which page the user sent the message
        widget=forms.SelectMultiple()
    )

    brand = forms.CharField(       # A hidden input for internal use
        max_length=50,              # tell from which page the user sent the message
        widget=forms.HiddenInput()
    )
    category = forms.CharField(       # A hidden input for internal use
        max_length=50,              # tell from which page the user sent the message
        widget=forms.HiddenInput()
    )
    tags = forms.CharField(       # A hidden input for internal use
        max_length=50,              # tell from which page the user sent the message
        widget=forms.HiddenInput()
    )


    def clean(self):
        cleaned_data = super(ContactForm, self).clean()
        name = cleaned_data.get('name')
        email = cleaned_data.get('email')
        message = cleaned_data.get('message')
        if not name and not email and not message:
            raise forms.ValidationError('You have to write something!')