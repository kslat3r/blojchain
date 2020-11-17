const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = swaggerUi.setup(swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'Blojchain API Explorer',
      version: '1.0.0',
    },
  },
  apis: [
    `${__dirname}/../routes/*.js`,
  ],
}));
