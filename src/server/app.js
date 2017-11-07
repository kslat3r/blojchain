const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const loggerMiddleware = require('./middleware/logger');
const pageNotFoundMiddleware = require('./middleware/pageNotFound');
const errorMiddleware = require('./middleware/error');

const blojsRoute = require('./routes/blojs');

const app = express();

app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blojs', blojsRoute);

app.use(pageNotFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
