from django.shortcuts import render

from base import api
import json

"""
Reasons to use server-side django templates instead of putting all logic in the client:
 - easier to do login checks / redirects
 - can package data in the initial request
"""


def hello_page(request):
    initial_json = json.loads(api.hello_page_data(request).content.decode('UTF-8'))
    initial_json_str = json.dumps(initial_json, sort_keys=True, indent=4)

    return render(request, 'react_template.html', context={
        'webpack_bundle': 'hello',
        'page_title': 'Login / Registration ~ Reactango',
        'initial_json': initial_json_str,
    })
def dashboard_function(request):
	print 'something'

	return render(request, 'react_template.html', context={
        'webpack_bundle': 'dashboard',
        'page_title': 'User Dashboard ~ Reactango',
    })

