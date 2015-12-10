# Apple TV TVML Sample App

This repo is a Work In Progress of, in my mind, a pretty sweet Apple TV TVOS/TVML/TVJS app setup. It features:

 - ES6 with Babel
 - Bundled Javascript with Webpack
 - Webpack is also managing:
   - Stylus for CSS
   - Jade for templates, compiling to a DOM object
   - Using `require()` to load up images
 - URL-based routing for easy navigation and view handling using page.js
 - Live reload
 
The structure of the application is very similar to an Express app, complete with routes and views. This is a
work in progress. I aim to flesh the project out to be more of a complete app, with plenty of documentation
and comments explaining how things work.

## Getting started

A TVML app for Apple TV consists of two parts:

 - The native Swift host app. This does very little - it just loads the javascript bundle.
 - The Javascript app. In production you would upload this to S3 or some sort of server. This is the bulk of the application.
 

Run the dev server with:

```
npm install
npm start
```

And build the native Swift host app into the simulator and it should all work.
