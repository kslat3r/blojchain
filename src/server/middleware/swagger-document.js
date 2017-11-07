const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../app-definition.json');

module.exports = swaggerUi.setup(swaggerDocument);
