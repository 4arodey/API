const HTTP_CODES = require('./httpCodes');
const logger = require('./src/logger');

const appConfig = require('./app.config');

require('dotenv/config');

function handleSuccess(actionFn) {
  return (req, res, next) => {
    Promise
      .resolve(actionFn(req, res))
      .then((actionResult) => {
        res.send({
          data: actionResult,
        });
      })
      .catch(next);
  };
}


function handleError(app) {
  app.use((err, req, res, next) => {
    if (!err) {
      next();
    }

    const errObj = {
      messsage: '',
      stackTrace: '',
      type: '',
    };


    errObj.messsage = appConfig.NODE_ENV === 'developer'
      ? err.message
      : 'Internal server error';

    errObj.stackTrace = appConfig.NODE_ENV === 'developer'
      ? err.stack
      : '';

    errObj.type = err.status === HTTP_CODES.CLIENT_ERROR
      ? 'Validation Error'
      : 'Internal Server Error';


    if (err.status === HTTP_CODES.SERVER_ERROR) {
      logger.error(err);
    }

    const httpErrorCode = err.status === HTTP_CODES.CLIENT_ERROR
      ? HTTP_CODES.CLIENT_ERROR
      : HTTP_CODES.SERVER_ERROR;

    res.status(httpErrorCode);

    res.send(errObj);
  });
}


module.exports = {
  handleSuccess,
  handleError,
};
