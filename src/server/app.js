const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const loggerMiddleware = require('./middleware/logger');
const swaggerUIMiddleware = require('./middleware/swagger-ui');
const swaggerDocumentMiddleware = require('./middleware/swagger-document');
const pageNotFoundMiddleware = require('./middleware/pageNotFound');
const errorMiddleware = require('./middleware/error');

const blojsRoute = require('./routes/blojs');

const app = express();

app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/explorer', swaggerUIMiddleware, swaggerDocumentMiddleware);
app.use('/blojs', blojsRoute);

app.use(pageNotFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
