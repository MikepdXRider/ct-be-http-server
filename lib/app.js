// This folder contains the "router" of our application. Dynamically handling requests via a routerMap. 

// Import necessary components. (resource map, functions, etc)

// create an asynchrounous app function to handle requests. 
module.exports = (req, res) => {
  console.log(req, res);
  res.end('hi');
};


