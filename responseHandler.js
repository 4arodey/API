const HTTP_CODES = require('./httpCodes');
const logger = require('./src/logger');

function handleSuccess(actionFn) {
  return (req, res) => {
    Promise
      .resolve(actionFn(req, res))
      .then((actionResult) => {
        res.send({
          data: actionResult,
        });
      });
  };
}


function handleError(app) {
  app.use((err, req, res, next) => {
    if (!err) {
      next();
    }

    logger.error(err);

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
