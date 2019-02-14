const usersRoutes = require('./user.routes');


function sendRoutes(app, router) {
  usersRoutes(app, router);
  app.use("/ping", (req, res) => {res.json({})});
}

module.exports = sendRoutes;
