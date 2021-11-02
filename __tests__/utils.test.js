// import app for testing.
const app = require('../lib/app.js');
// import simpleDB for instance creation and use.
const SimpleDb = require('../SimpleDB.js');
// import request from supertest
const request = require('supertest');

// create a new route
const ROOTDIR = './store';

// create a simpleDB instance for testing purposes
const testDb = new SimpleDb(ROOTDIR);

// make a describes block.
describe('tests app behaviors', () => {

  
  // create a beforeEach method which clears the stored folders/files.
  beforeEach(() => {

  });

  // tests for body parser:
  //  - returns null if method is not POST, PUT, or PATCH
  //  - throws if content-type is not application/json
  //  - returns deserialized body from req emitted events (using JSON.parse)
  //  - throws if failure happens in deserialization
    
  // tests for resource router:
  //  - should match POST /cats and GET /cats/:id
  //  - should GET /cats
  //  - should PUT /cats/:id
  //  - should DELETE /cats/:id
});



