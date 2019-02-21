const usersRoutes = require('./user.routes');
const responseHandler = require('../responseHandler');

function sendRoutes(app, router) {
  usersRoutes(app, router);
  app.get('/ping', responseHandler.handleSuccess(() => ({})));
  app.get('/error', () => {throw error})
}

module.exports = sendRoutes;
