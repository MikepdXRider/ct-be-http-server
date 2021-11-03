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
// import eventemitter from events
const EventEmitter = require('events');


// create a new route
const ROOTDIR = './store';

jest.setTimeout(10000);

// create a simpleDB instance for testing purposes
// const testDb = new SimpleDb(ROOTDIR);


// make a describes block.
describe('tests app behaviors', () => {

  describe('tests body parser function behavior', () => {
    // tests for body parser:
    //  - returns null if method is not POST, PUT, or PATCH
    it('it returns null if method is not POST, PUT, or PATCH', async () => {
      const fakeRequest = { method: 'GET' };
        
      const actual = await parseBody(fakeRequest);
    
      expect(actual).toEqual(null);
    });
    
    //  - throws if content-type is not application/json
    it('it throws an error if the content-type is not application/json', async () => {
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
    it('it returns deserialized body from req emitted events (using JSON.parse)', async () => {
      // asigns a new eventemitter to req variable. An event emitter will allow an event listener to be triggered.
      const request = new EventEmitter();
      // assigns the content header type to our request so our listener/parsebody function knows how to handle.
      request.headers = { 'content-type': 'application/json' };
      // assigns the method type to our request so our listener/parsebody function knows how to handle. 
      request.method = 'POST';
      // call parseBody passing it the request. ❗ IDK WHY THIS IS DONE HERE AND IS USED LATER ❗!?
      const promise = parseBody(request);
      // using the defined request eventemitter, emit a 'data' event(first param) and the desired JSON data chunk(second param). The 'data' event is important because our parseBody function will be listening for this type of event so it can be handled. 
      request.emit('data', '{ "test": ');
      // see the previous comment. This is the second chunk. Which will be organized and connected to the previous chunk in our parseBody function.
      request.emit('data', ' "success" }');
      // using the define request eventemitter, emit an 'end' event(single param). This event is important because our parseBody function will be listening for this type of event to trigger the pending promise to resolve/reject. 
      request.emit('end');
    
      // call parseBody(request) again?? ❗ THIS DOESN"T MAKE ANY SENSE TO ME ❗!
      const body = await promise;
      // once the promise resolves, check that it returns the expected parsed object. 
      expect(body).toEqual({ test: 'success' });
    });
    
    //  - throws if failure happens in deserialization
    it('it throws if failure happens in deserialization', async () => {
      // asigns a new eventemitter to req variable. An event emitter will allow an event listener to be triggered.
      const request = new EventEmitter();
      // assigns the content header type to our request so our listener/parsebody function knows how to handle.
      request.headers = { 'content-type': 'application/json' };
      // assigns the method type to our request so our listener/parsebody function knows how to handle. 
      request.method = 'POST';
      // call parseBody passing it the request. ❗ IDK WHY THIS IS DONE HERE AND IS USED LATER ❗!?
      const promise = parseBody(request);
      // using the defined request eventemitter, emit a 'data' event(first param) and the desired bad JSON data chunk(second param). The 'data' event is important because our parseBody function will be listening for this type of event so it can be handled. 
      request.emit('data', 'test');
      // see the previous comment. This is the second chunk. Which will be organized and connected to the previous chunk in our parseBody function.
      request.emit('data', 'success');
      // using the define request eventemitter, emit an 'end' event(single param). This event is important because our parseBody function will be listening for this type of event to trigger the pending promise to resolve/reject. 
      request.emit('end');
      
      // because we're testing for a promise to throw an error, we must use a try...catch to catch the returning/expected error. 
      try {
        // call parseBody(request) again?? ❗ THIS DOESN"T MAKE ANY SENSE TO ME ❗!
        await promise;
      } catch (e) {
        // once the promise resolves, check that it returns the expected parsed object. 
        expect(e).toEqual('Terrible JSON');
      }
    });
  });
    

  describe('tests resource router behavior', () => {
    //   create a beforeEach method which clears the stored folders/files.
    beforeEach(() => {
      return rmdir(ROOTDIR, { recursive: true, force: true })
        .then(() => mkdir(ROOTDIR));
    });

    //   tests for resource router:  
    //    - should match POST /cats and GET /cats/:id
    it('should match POST /spoons and GET /spoons/:id', async () => {
      const newSpoon = {
        type: 'soup',
        material: 'steel',
        description: 'A spoon you would use to serve soup'
      };

      //   const stringifiedNewSpoon = JSON.stringify(newSpoon);

      //  ❗ Why don't I need to stringify this? Does supertest automatically stringiy what I'm passing in? ❗
      const postResponse = await request(app)
        .post('/spoons')
        .send(newSpoon);

      const getResponse = await request(app)
        .get(`/spoons/${postResponse.body.id}`);

      expect(getResponse.body).toEqual(postResponse.body);
    });
    //    - should GET /cats
    //    - should PUT /cats/:id
    //    - should DELETE /cats/:id
  }); 
});



