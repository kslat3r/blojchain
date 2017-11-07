const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = swaggerUi.setup(swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'Blojchainj',
      version: '1.0.0',
    },
  },
  apis: ['../routes/*.js'],
}));
