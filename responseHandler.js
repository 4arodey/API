const HTTP_CODES = require('./httpCodes');
const logger = require('./src/logger');
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
      stackTrase: '',
      type: 'Validation Error',
    };

    if (process.env.NODE_ENV === 'developer') {
      errObj.messsage = err.message;
      errObj.stackTrase = err.stack;

      if (err.status === 500) {
        errObj.messsage = 'Internal server error';
      }
    }

    if (err.status === 500) {
      logger.error(err);
    }
    res.status(HTTP_CODES.SERVER_ERROR);
    res.send(errObj);
  });
}


module.exports = {
  handleSuccess,
  handleError,
};
