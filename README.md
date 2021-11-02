# HTTP Server

Create an http server using the built-in `http` module in node. It will:
1. ✔Delegate requests for different API resource routes using an object map.
2. ✔ Use a router object with methods that correspond to HTTP methods (so it can be called dynamically as an object map)
3. ✔ Parse the request body for incoming `POST` and `PUT` methods
4. ✔ Use your SimpleDb (or the one available in this folder) for persisting and retrieving the data associated with the resource
5. STRETCH: Serve static files from a `public` directory using the `fs` module

## Process

## Steps

* design a solution (in english what do you need to do)
* break down the problem into smaller chunks
* start working on chunks
  * define an outcome (how do you know when the chunk is complete)
  * define a validation (write a test)
  * write code
  * validate code (test passes)
  * commit
  * read code and refactor
  * commit
  * repeat for next chunk

## Main Setup

1. You main app will live in `/lib/app.js` and will be an exported function whose signature is the node http request listener `(req, res)`
2. Your app's entry point will be `server.js` in the root of your project. It will:
    1. Require the `http` module and your app request listener from `/lib/app.js`
    1. Create an http server and start listening
1. Test the pieces of your app using a test file per major feature area outlined below

## Body Parser

Create a module that exports a function that takes a http `req` object and returns a promise for the parsed body. Test and build out the following requirements:
1. `✓ returns null if method is not POST, PUT, or PATCH`
1. `✓ throws if content-type is not application/json`
1. `✓ returns deserialized body from req emitted events (using JSON.parse)`
1. `✓ throws if failure happens in deserialization`

Your will need to construct a Promise to return via:

```js
return new Promise((resolve, reject) => {
  // do work here
});
```

## Resource Router

Pick a resource, like `cats`. Create a module that exports an object with four methods named after the HTTP methods: `post`, `get`, `put`, and `delete`. Each of these methods takes (`req, res`) objects and processes the API request for the resource.

Import and use a `SimpleDb` instance to do the data persistance and retrieval. Use a folder at the root of your project like `/store/cats` as the root directory for the SimpleDb instance.

Import the router into `app.js` and create an object map that `app` uses to pick a resource based on the first part of `req.url`. Use this object map in the request listener, and call the corresponding method based on `req.method.toLowerCase()`.

You'll need to use your body parser and SimpleDb instance in these methods.

Test and build out the following requirements for your router:
1. `✓ should match POST /cats and GET /cats/:id`
1. `✓ should GET /cats`
1. `✓ should PUT /cats/:id`
1. `✓ should DELETE /cats/:id`

Your tests should remove and recreate the root directory at `/store/cats`

## STRETCH: Serve Static files from `/public`

Create a `/public` folder at the root of your project, and fill in the following files and folders:

```
/public
  +-- css
  |     +-- main.css
  +-- index.html
```

Test and build out the following requirements:
1. `✓ should return index.html from GET /`
1. `✓ should return main.css file contents on GET /styles/main.css`
1. `✓ should return 404 from GET /bad-file`
1. `✓ should return 404 from GET of folder /styles`

In your test file:
1. Use `supertest` to create an http server instances from your required `app` request listener
1. Use the the `fs` module to read the files from `/public` to test against the return from the http server.

When the tests are all passing for the static file server, consider moving your static file functionality into its own module separate from `/lib/app.js`

## Rubric **10pts**

* Correct project structure (server and app): *1pt*
* Unit tested body parser: *3pt*
* Return 404 if not found (not a file, not a resource): *1pt*
* API Data Resources
    * `POST`: *1pt*
    * `GET by id`: *1pt*
    * `GET all`: *1pt*
    * `DELETE`: *1pt*
    * `PUT`: *1pt*
* STRETCH: E2E tested static file server *2pt*