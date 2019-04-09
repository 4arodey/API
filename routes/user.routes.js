const responseHandler = require('../responseHandler');

const usersService = require('../services/users/users.service');

const knex = require('../db/knex');


function findAll() {
  return usersService.findAll();
}

function findById(req) {
  return usersService.findById(req.params.id);
}

function create(req) {
  return usersService.create(req.body);
}

function update(req) {
  return usersService.update(req.params.id, req.body);
}

function remove(req) {
  return usersService.delete(req.params.id);
}

function sendUserRoutes(app, router) {
  router.get('/all', (req, res) => {
    knex.select().from('users').then((todos) => {
      res.send(todos);
    });
  });
  router
    .route('/')
    .get(responseHandler.handleSuccess(findAll))
    .post(responseHandler.handleSuccess(create));
  router
    .route('/:id')
    .get(responseHandler.handleSuccess(findById))
    .put(responseHandler.handleSuccess(update))
    .post(responseHandler.handleSuccess(create))
    .delete(responseHandler.handleSuccess(remove));
  app.use('/api/v1/users', router);
}


module.exports = sendUserRoutes;
