// This folder contains the "router" of our application. Dynamically handling requests via a routerMap. 

// Import necessary components. (resource map, functions, etc)

// create an asynchrounous app function to handle requests. 
module.exports = async (req, res) => {
  const reqUrl = req.url;
  const reqMethod = req.method;
  console.log('URL: ', reqUrl);
  console.log('Method: ', reqMethod);
  //   console.log('res', res);
  await res.end('hi');
};


