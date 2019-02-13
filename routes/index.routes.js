const usersRoutes = require('./user.routes');


function sendRoutes(app, router) {
  usersRoutes(app, router);
}

module.exports = sendRoutes;
