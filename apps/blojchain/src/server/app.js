const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const loggerMiddleware = require('./middleware/logger');
const swaggerUIMiddleware = require('./middleware/swagger-ui');
const swaggerDocumentMiddleware = require('./middleware/swagger-document');
const pageNotFoundMiddleware = require('./middleware/page-not-found');
const errorMiddleware = require('./middleware/error');

const blojsRoute = require('./routes/blojs');
const queuesRoute = require('./routes/queues');
const confirmRoute = require('./routes/confirm');
const logsRoute = require('./routes/logs');
const mineRoute = require('./routes/mine');
const peersRoute = require('./routes/peers');
const verifyRoute = require('./routes/verify');

const app = express();

app.use(loggerMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/explorer', swaggerUIMiddleware, swaggerDocumentMiddleware);
app.use(queuesRoute);
app.use(confirmRoute);
app.use(logsRoute);
app.use(mineRoute);
app.use(blojsRoute);
app.use(peersRoute);
app.use(verifyRoute);

app.use(pageNotFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
