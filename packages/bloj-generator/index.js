const config = require('./config.json');
const request = require('request-promise');
const faker = require('faker');

let i = 0;

const generateBloj = async () => {
  let peers;

  try {
    peers = await request({
      method: 'GET',
      uri: `${config.seed}/peers`,
      json: true,
    });
  } catch (e) {
    console.log(e);
  }

  if (peers && peers.length) {
    const randomPeer = peers[Math.floor(Math.random() * peers.length)];
    const randomPeerHost = randomPeer.meta.serverHost;
    const randomPeerPort = randomPeer.meta.serverPort;
    const uri = `http://${randomPeerHost}:${randomPeerPort}/blojs`;

    let response;

    try {
      response = await request({
        method: 'POST',
        uri,
        body: {
          i,
          uri,
          data: `${faker.name.firstName()}-${faker.hacker.noun()}`,
        },
        json: true,
      });
    } catch (e) {
      console.log(e);
    }

    if (response) {
      console.log(`${randomPeerHost}:${randomPeerPort}/blojs`, response);
    }
  }

  i++;
};

setInterval(generateBloj, config.requestIntervalMs);