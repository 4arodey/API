const express = require('express');

const responseHandler = require('./responseHandler');
const config = require('./config');

const app = express();
const router = express.Router();

const logger = require('./src/logger');

const routeBuilder = require('./routes/index.routes');

routeBuilder(app, router);

responseHandler.handleError(app);

app.listen(config.PORT, () => {
  logger.info(`API is started. The port is ${config.PORT}.`);
});