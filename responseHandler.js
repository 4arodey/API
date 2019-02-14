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

      (process.env.NODE_ENV === 'developer') ? logger.error(err) : logger.error('Internal server error');

    res.status(HTTP_CODES.SERVER_ERROR);
    res.send({
      error: err,
    });
  });
}


module.exports = {
  handleSuccess,
  handleError,
};
