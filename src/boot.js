const Server = require('./server');
const Client = require('./client');
const events = require('./events');
const blojsGetAll = require('./requests/blojs-get-all');
const menu = require('./menu');

new Server({ port: process.env.PORT || 53645 });
const client = new Client();

events(client);
blojsGetAll(client);
menu(client);
