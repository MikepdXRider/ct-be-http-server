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
    console.log('testing savedObj from post', savedObj);
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
  }
  // 'put': async (req, res) => {
  //   // const body = parseBody(req);
  // },
  // 'delete': async (req, res) => {
  //   // const body = parseBody(req);
  // }
};

