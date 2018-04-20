# CWP

## Installation
1. `sudo apt install npm`
2. `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`
3. Restart shell
4. `nvm install stable && nvm use stable`
5. `npm install`

## Running the server
run `./start_debug.sh` to start the server

## Project Organization

### app.js
The "main()" function of the server lives here. Set up routes and change configurations in this file

### Public/
Place all of the static content (client-side javascript, images, css files) that should be downloadable by a webbrowser. Do not put server stuff or templated HTML in here. You can access these files in a template by doing something along the lines of `<script src="./Scripts/Slideshow.js"></script>`. Notice that you **do not** include the `public` part of the file path.

### Routes/
Routes are what tell the server how to properly complete requests to a given url. We create the actual handlers in the routes folder, and tell the application about them in app.js using
```javascript
var newRoute = require('./routes/newroute'); // Assumes a routes/newroute.js exists
app.use('/path/to/new/route', newroute);
```

### Views/
Location for templated HTML.  Current templating enginge is HandlebarsJS.
