const VALID = ['POST', 'PATCH', 'PUT'];

module.exports = async (req) => {
  if (!VALID.includes(req.method)) return null;

  return new Promise((resolve, reject) => {
    if (req.headers['content-type'] != 'application/json') {
      reject('content-type must be application/json');
      return;
    }
  });
  // returns null if method is not POST, PUT, or PATCH
  // returns a new promise with a bunch of cool stuff. 
  //   - throws if content-type is not application/json
  //   - returns deserialized body from req emitted events (using JSON.parse)
  //   - throws if failure happens in deserialization
};

