from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader, RequestContext
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django import template

# member profile page
@login_required
def member_index(request):
    t = loader.get_template('member/member-index.html')
    c = {}  #{'foo': 'bar'}
    return HttpResponse(t.render(c, request), content_type='text/html')

# member edit prof
@login_required
def member_action(request):
    t = loader.get_template('member/member-action.html')
    c = {}  #{'foo': 'bar'}
    return HttpResponse(t.render(c, request), content_type='text/html')

@login_required(login_url="/login/")
def index(request):
    return render(request, "index.html")

@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:
        
        load_template = request.path.split('/')[-1]
        html_template = loader.get_template( load_template )
        return HttpResponse(html_template.render(context, request))
        
    except template.TemplateDoesNotExist:

        html_template = loader.get_template( 'error-404.html' )
        return HttpResponse(html_template.render(context, request))

    except:
    
        html_template = loader.get_template( 'error-500.html' )
        return HttpResponse(html_template.render(context, request))

