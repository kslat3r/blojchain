const Server = require('./server');
const Client = require('./client');
const events = require('./events');
const blojsGetAll = require('./requests/blojs-get-all');
const menu = require('./menu');

new Server({ port: process.env.PORT || 53645 });

setTimeout(() => {
  const client = new Client();
}, 1000);

// events(client);
// blojsGetAll(client);
// menu(client);
