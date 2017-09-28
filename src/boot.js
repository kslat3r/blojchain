const client = require('./client');
const events = require('./events');
const menu = require('./menu');

const port = process.env.PORT || 53645;
const host = process.env.HOST || 'localhost';

const peer = client(host, port);

events(peer);

setTimeout(() => {
  menu();
}, 500);
