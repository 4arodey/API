const usersRoutes = require('./user.routes');
const responseHandler = require('../responseHandler');

function sendRoutes(app, router) {
  usersRoutes(app, router);
  app.get('/ping', responseHandler.handleSuccess(() => ({})));
}

module.exports = sendRoutes;
