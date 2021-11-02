// import app for testing.
const app = require('../lib/app.js');
// import simpleDB for instance creation and use.
// const SimpleDb = require('../SimpleDB.js');
// import request from supertest
const request = require('supertest');
// import rmdir and mkdir promises from fs.
const { rmdir, mkdir } = require('fs/promises');
// import parseBody function
const parseBody = require('../lib/utils/parse-body.js');

// create a new route
const ROOTDIR = './store';

// create a simpleDB instance for testing purposes
// const testDb = new SimpleDb(ROOTDIR);

// make a describes block.
describe('tests app behaviors', () => {

  
  // create a beforeEach method which clears the stored folders/files.
  beforeEach(() => {
    return rmdir(ROOTDIR, { recursive: true, force: true })
      .then(() => mkdir(ROOTDIR));
  });

  // tests for body parser:
  //  - returns null if method is not POST, PUT, or PATCH
  //        - Start by defining this test.
  //        - Then move to app.js to create the infrastructure to dynamically communicate with the resource map.
  //        - Then move to resource.js to create the resource map to accomplish this task.
  //        - Continue through the list. Then start working on tests for resource router. 
  it('parseBody returns null if method is not POST, PUT, or PATCH', async () => {
    const actual = await request(app).get('/');

    expect(actual.text).toEqual('null');
  });
  //  - throws if content-type is not application/json
  //  - returns deserialized body from req emitted events (using JSON.parse)
  //  - throws if failure happens in deserialization
    
  // tests for resource router:  
  //  - should match POST /cats and GET /cats/:id
  //  - should GET /cats
  //  - should PUT /cats/:id
  //  - should DELETE /cats/:id
});



