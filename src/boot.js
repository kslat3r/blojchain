const instance = require('./lib/instance');
const blojsRequests = require('./lib/requests/blojs');

instance.createServer();
instance.createNode();

(async function () {
  const blojs = await blojsRequests.get();

  console.log(blojs);
})();
