const VALID = ['POST', 'PATCH', 'PUT'];

module.exports = async (req) => {
  // returns null if method is not POST, PUT, or PATCH
  if (!VALID.includes(req.method)) return null;

  // returns a new promise with a bunch of cool stuff. 
  return new Promise((resolve, reject) => {
    //   - throws if content-type is not application/json
    if (req.headers['content-type'] != 'application/json') {
      reject('content-type must be application/json');
      return;
    }
  });
  
  //   - returns deserialized body from req emitted events (using JSON.parse)

  //   - throws if failure happens in deserialization
};

