const http = require('http');
const socketIo = require('socket.io');
const netConfig = require('../config/net');

const server = http.createServer(() => {});
const io = socketIo(server);

server.listen(netConfig.socketPort);

module.exports = io;
