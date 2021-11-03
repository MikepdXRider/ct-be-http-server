// import parseBody function to parse the passed in request bodies for use in the relevant methods.
const parseBody = require('./lib/utils/parse-body.js');
// import simpleDB for use in methods.
const SimpleDb = require('./SimpleDB.js');

const ROOTDIR = './store';
const db = new SimpleDb(ROOTDIR);

module.exports = {
  // asynchronous port methods here.
  'post': async (req, res) => {
    const bodyObj = await parseBody(req);
    await db.save(bodyObj);
    const savedObj = await db.get(bodyObj.id);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedObj));
  },
  'get': async (req, res) => {
    const [, , id] = req.url.split('/');

    if (id) {
      const retrievedObj = await db.get(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(retrievedObj));
    } else {
      const retrievedArr = await db.getAll();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(retrievedArr));
    }
  },
  'put': async (req, res) => {
    const bodyObj = await parseBody(req);
    await db.edit(bodyObj);
    const savedObj = await db.get(bodyObj.id);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedObj));
  },
  'delete': async (req, res) => {
    const [, , id] = req.url.split('/');

    if (id){
      await db.remove(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'plain/text');
      res.end('Resource Deleted!');
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'plain/text');
      res.end('No ID provided');
    }
  }
};

