module.exports = {
  serverHost: process.env.SERVER_HOST || '127.0.0.1',
  serverPort: process.env.SERVER_PORT || 3000,
  nodeHost: process.env.NODE_HOST || '127.0.0.1',
  nodePort: process.env.NODE_PORT || 55356,
  socketHost: process.env.SOCKET_HOST || '127.0.0.1',
  socketPort: process.env.SOCKET_PORT || 4000,
};
