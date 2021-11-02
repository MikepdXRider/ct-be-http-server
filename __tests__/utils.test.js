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
const { error } = require('console');

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
    const fakeRequest = { method: 'GET' };
    
    const actual = await parseBody(fakeRequest);

    expect(actual).toEqual(null);
  });

  //  - throws if content-type is not application/json
  it('parseBody throws an error if the content-type is not application/json', async () => {
    const fakeRequest = {
      method: 'POST',
      headers: {
        'content-type': 'text'
      }
    };

    try {
      await parseBody(fakeRequest);
    } catch (e) {
      expect(e).toEqual('content-type must be application/json');
    }
  });
  //  - returns deserialized body from req emitted events (using JSON.parse)
  //  - throws if failure happens in deserialization
    
  // tests for resource router:  
  //  - should match POST /cats and GET /cats/:id
  //  - should GET /cats
  //  - should PUT /cats/:id
  //  - should DELETE /cats/:id
});



