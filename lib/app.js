// This folder contains the "router" of our application. Dynamically handling requests via a routerMap. 

// Import necessary components. (resource map, functions, etc)
const resource = require('../resource.js');


// Import the router into app.js and create an object map that app uses to pick a resource based on the first part of req.url. Use this object map in the request listener, and call the corresponding method based on req.method.toLowerCase().
const resourceMap = {
  spoons: resource
};


// create an asynchrounous app function to handle requests. 
module.exports = async (req, res) => {
  //  destructure the second item in the array returning from splitting the incomming url.
  const [, resourceStr] = req.url.split('/');
  //  create a resourcePath variable which holds an attempt to acces the resource map.
  const resourcePath = resourceMap[resourceStr];

  // if resourcePath is valid...
  if (resourcePath) {
    try {
      // attach method to resource path and save it as a variable function.
      const routeHandlerFn = resourcePath[req.method.toLowerCase()];
      // call new function, passing in req and res.
      //   console.log('req value', req);
      await routeHandlerFn(req, res);
    } catch (e) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};


