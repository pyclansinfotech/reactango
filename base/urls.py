"""seqr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url
from base import pages
from base import api

api_endpoints = {
    '': api.hello_page_data,
    'test_fun' : api.test_function,
    'login_fun': api.login_function,
    'update_userDetails': api.updateUserDetails,
    'delete_userAccount': api.deleteUserAccount,
}

page_endpoints = {
    '': pages.hello_page,
    'dashboard': pages.dashboard_function,
}

# page api
urlpatterns = []
urlpatterns += [url("^%(url_endpoint)s$" % locals(), handler_function) for url_endpoint, handler_function in page_endpoints.items()]

# versioned api
urlpatterns += [url("^api/%(url_endpoint)s$" % locals(), handler_function) for url_endpoint, handler_function in api_endpoints.items()]
#urlpatterns += [url("^api/v1/%(url_endpoint)s$" % locals(), handler_function) for url_endpoint, handler_function in api_endpoints.items()]
