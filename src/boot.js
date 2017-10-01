const client = require('./client');
const chain = require('./chain');
const requests = require('./requests');
const events = require('./events');
const menu = require('./menu');

const port = process.env.PORT || 53645;
const host = process.env.HOST || 'localhost';
const peer = client(host, port);

requests.bind(peer)
events.bind(peer);

chain.reset();
requests.getBlocks();

setTimeout(() => {
  menu();
}, 500);
