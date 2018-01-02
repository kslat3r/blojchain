const config = require('./config.json');
const request = require('request-promise');
const faker = require('faker');

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

    let response;

    try {
      response = await request({
        method: 'POST',
        uri: `http://${randomPeerHost}:${randomPeerPort}/blojs`,
        body: {
          [faker.name.firstName()]: faker.lorem.sentences(10),
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
};

setInterval(generateBloj, config.requestIntervalMs);