const express = require('express');
const createMiddleware = require('swagger-express-middleware');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const swaggerDocument = yaml.load('swaggerValidator.yaml');

const responseHandler = require('./responseHandler');
const appConfig = require('./app.config');

const app = express();
const router = express.Router();

const logger = require('./src/logger');

const routeBuilder = require('./routes/index.routes');


createMiddleware(swaggerDocument, app, (err, middleware) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(middleware.parseRequest());
  app.use(middleware.validateRequest());

  routeBuilder(app, router);

  responseHandler.handleError(app);
});


app.listen(appConfig.PORT, () => {
  logger.info(`API is started. The port is ${appConfig.PORT}.`);
});
