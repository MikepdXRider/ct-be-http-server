module.exports = () => {
  // returns null if method is not POST, PUT, or PATCH
  // returns a new promise with a bunch of cool stuff. 
  //   - throws if content-type is not application/json
  //   - returns deserialized body from req emitted events (using JSON.parse)
  //   - throws if failure happens in deserialization
};

