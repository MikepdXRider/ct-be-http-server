// import parseBody function to parse the passed in request bodies for use in the relevant methods.
const parseBody = require('./utils/parse-body.js');
// import simpleDB for use in methods.
// const SimpleDb = require('./SimpleDB.js');


module.exports = {
  // asynchronous port methods here.
  'post': async (req, res) => {
    // const body = parseBody(req);
    console.log('req', res);
    console.log('res', res);
  },
  'get': async (req, res) => {
    console.log('req', res);
    console.log('res', res);
  }
  // 'put': async (req, res) => {
  //   // const body = parseBody(req);
  // },
  // 'delete': async (req, res) => {
  //   // const body = parseBody(req);
  // }
};

