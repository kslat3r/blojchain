const recursiveReadSync = require('recursive-readdir-sync')

module.exports = (peer) => {
  const files = recursiveReadSync(__dirname);

  files.forEach((file) => {
    if (file.indexOf('index.js') === -1) {
      require(`${file.replace(/\.js/, '')}`)(peer);
    }
  });
};
