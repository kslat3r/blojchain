const peer = require('./peer');
const events = require('./events');
const blojsGetAll = require('./requests/blojs-get-all');
const menu = require('./menu');

const port = process.env.PORT || 53645;
const p = peer(port);

events(p);
blojsGetAll(p);
menu(p);
