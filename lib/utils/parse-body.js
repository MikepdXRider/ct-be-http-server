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

    // create an accumulator pattern
    let dataStrAcc = '';
    // use the req.on method listener to catch any 'data'(first param which defines the event we're listening for) emitters for data chunks and pushes them to our data string accumulator.
    req.on('data', (chunk) => dataStrAcc += chunk);

    // user the req.on method listener to catch 'end' events emitters. 
    // Why does the callback need to be asynchrounous? Is it because we're waiting for dataStrAcc to finish it's work? Wouldn't recieving the 'end' event emitter call indicate to us that all data has been sent and retrieved?
    req.on('end', async () => {
      try{
        //   - returns deserialized body from req emitted events (using JSON.parse)
        resolve(JSON.parse(dataStrAcc));
      } catch (e) {
        //   - throws if failure happens in deserialization
        reject('Terrible JSON');
      }
    });
  });

  

};

