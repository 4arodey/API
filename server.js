const express = require('express');
const createMiddleware = require('swagger-express-middleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('swaggerValidator.yaml');

const responseHandler = require('./responseHandler');
const appConfig = require('./app.config');

const app = express();
const router = express.Router();

const logger = require('./src/logger');

const routeBuilder = require('./routes/index.routes');

createMiddleware(swaggerDocument, app, (err, middleware) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(middleware.metadata());
  app.use(middleware.CORS());
  app.use(middleware.files());
  app.use(middleware.parseRequest());
  app.use(middleware.validateRequest());

  routeBuilder(app, router);

  responseHandler.handleError(app);
});

app.listen(appConfig.PORT, () => {
  logger.info(`API is started. The port is ${appConfig.PORT}.`);
});
