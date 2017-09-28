const inquirer = require('inquirer');
const logger = require('./logger');
const chain = require('./chain');

const menu = () => {
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

        menu();

        break;

      case 'Add a bloj':
        inquirer.prompt({
          type: 'input',
          name: 'data',
          message: 'Enter your dataj to add to the blojchainj',
        })
        .then((answers) => {
          chain.add({
            data: answers.data,
          });

          menu();
        });

        break;

      case 'Reset the blojchainj':
        chain.reset();

        menu();

        break;
    }
  });
}

module.exports = menu;
