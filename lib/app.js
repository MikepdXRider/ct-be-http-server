// This folder contains the "router" of our application. Dynamically handling requests via a routerMap. 

// Import necessary components. (resource map, functions, etc)
const parseBody = require('./utils/parse-body.js');

// create an asynchrounous app function to handle requests. 
module.exports = async (req, res) => {
  const reqUrl = req.url;
  const reqMethod = req.method;
  const reqBody = await parseBody(req);

  console.log('Request URL: ', reqUrl);
  console.log('Request Method: ', reqMethod);
  console.log('Request Body: ', reqBody);
  //   console.log('res', res);
  res.setHeader('Content-Type', 'text/plain');
  res.end(`${reqBody}`);
};


