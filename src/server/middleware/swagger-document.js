const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(`${__dirname}/../app-definition.yaml`);

module.exports = swaggerUi.setup(swaggerDocument);
