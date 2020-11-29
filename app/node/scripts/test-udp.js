const Swim = require('swim');

const connection = new Swim({
  local: {
    host: `localhost:55356`,
  },
  interval: 1000,
  joinTimeout: 10000,
});

connection.bootstrap(['blojchain-node-c-swim:55356']);

connection.on(Swim.EventType.Error, (err) => {
  console.log(err);
});

connection.on(Swim.EventType.Ready, () => {
  console.log('Ready');
});
