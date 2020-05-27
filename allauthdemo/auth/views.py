from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic.edit import FormMixin, UpdateView
from allauth.utils import get_form_class
from allauth.account.views import (
    AjaxCapableProcessFormViewMixin,
    CloseableSignupMixin,
    RedirectAuthenticatedUserMixin,
)
from django.views.generic.edit import FormView
from allauth.account import app_settings as account_settings
from allauth.socialaccount import app_settings, helpers
from allauth.account.adapter import get_adapter as get_account_adapter

from .forms import UserEditForm, IntegrationForm, ProductForm

from django.shortcuts import render


class MyModelInstanceMixin(FormMixin):
    def get_model_instance(self):
        return None

    def get_form_kwargs(self):
        kwargs = super(MyModelInstanceMixin, self).get_form_kwargs()
        instance = self.get_model_instance()
        if instance:
            kwargs.update({'instance': instance})
        return instance


class UserEditView(UpdateView):
    """Allow view and update of basic user data.

    In practice this view edits a model, and that model is
    the User object itself, specifically the names that
    a user has.

    The key to updating an existing model, as compared to creating
    a model (i.e. adding a new row to a database) by using the
    Django generic view ``UpdateView``, specifically the
    ``get_object`` method.
    """
    form_class = UserEditForm
    template_name = "auth/profile.html"
    view_name = 'account_profile'
    success_url = reverse_lazy(view_name)

    def get_object(self):
        return self.request.user

    def form_valid(self, form):
        form.save()
        messages.add_message(self.request, messages.INFO, 'User profile updated')
        return super(UserEditView, self).form_valid(form)


account_profile = login_required(UserEditView.as_view())




class IntegrationsView(AjaxCapableProcessFormViewMixin, FormView):
    template_name = "dashboard/panels.html"
    form_class = IntegrationForm
    view_name = 'integrations_action'
    success_url = reverse_lazy(view_name)


    def get_form_class(self):
        return get_form_class(app_settings.FORMS,
                              'disconnect',
                              self.form_class)

    def get_form_kwargs(self):
        kwargs = super(IntegrationsView, self).get_form_kwargs()
        kwargs["request"] = self.request
        return kwargs

    def form_valid(self, form):
        get_account_adapter().add_message(self.request,
                                          messages.INFO,
                                          'socialaccount/messages/'
                                          'account_disconnected.txt')
        form.save()
        return super(IntegrationsView, self).form_valid(form)

    def get_ajax_data(self):
        account_data = []
        for account in SocialAccount.objects.filter(user=self.request.user):
            provider_account = account.get_provider_account()
            account_data.append({
                'id': account.pk,
                'provider': account.provider,
                'name': provider_account.to_str()
            })
        return {
            'socialaccounts': account_data
        }


integrations_action = login_required(IntegrationsView.as_view())




# new_product = login_required(product_create_view.as_view())

def product_create_view(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            pass  # does nothing, just trigger the validation
    else:
        form = ProductForm()
    return render(request, 'dashboard/flaticons.html', {'form': form})