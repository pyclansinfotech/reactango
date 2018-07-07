# django-react-start

This is a template for a Django + React.js application.

Installing dependencies, initialization:
```
pip install --upgrade -r requirements.txt   # install python dependencies 
python manage.py migrate    # initialize the django sqlite database

npm install    # install javascript dependencies
```

Build, run a dev server:
```
python manage.py runserver         # start a django dev server on port 8000

npm run build    # dev. build of client-side code  (use npm run build-prod to build the production version)
npm run watch    # dev. auto-build on code change

# open the site through a django endpoint which generates the html and embeds a json bundle in the page
open http://localhost:8000/hello 
```

For hot-reloading during development:
```
python manage.py runserver         # start a django dev server on port 8000
npm run server                     # start a dev server with hot-reloading on port 3000

# open the site by directly opening the static html file. The client-side code will use ajax to retrieve the initial bundle.
open http://localhost:3000/assets/bundles/hello.html  

# NOTE: the webpack server here is running on port 3000, but it proxies ajax requests to the python server on port 8000 (see server.js)

```

-------
Using these 3rd-party tools:
* django (https://www.djangoproject.com/)
* django webpack-loader (https://github.com/owais/django-webpack-loader) 
* React.js (https://facebook.github.io/react/docs/hello-world.html)
* Semantic-UI-React (http://react.semantic-ui.com)  

      

