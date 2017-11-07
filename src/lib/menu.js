const inquirer = require('inquirer');
const logger = require('./logger');
const chain = require('./chain');
const blojMine = require('./requests/bloj-mine');

const menu = (peer) => {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to doj?',
    choices: [
      'View the blojchainj',
      'Add a bloj',
      'Reset the blojchainj',
    ],
  })
  .then((answers) => {
    switch (answers.menu) {
      case 'View the blojchainj':
        logger.info(chain.get());

        menu(peer);

        break;

      case 'Add a bloj':
        inquirer.prompt({
          type: 'input',
          name: 'data',
          message: 'Enter your dataj to add to the blojchainj',
        })
        .then((answers) => {
          blojMine(peer, JSON.parse(answers.data));

          menu(peer);
        });

        break;

      case 'Reset the blojchainj':
        chain.reset();

        menu(peer);

        break;
    }
  });
}

module.exports = menu;
