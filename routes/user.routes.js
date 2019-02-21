const responseHandler = require('../responseHandler');

const users = [
  {
    id: 1,
    name: 'Olga',
    lastname: 'User',
  },
  {
    id: 2,
    name: 'Vasia',
    lastname: 'User',
  },
  {
    id: 3,
    name: 'Ivan',
    lastname: 'User',
  },
];

function findUsers() {
  return users;
}

function findUserById(req) {
  return users.find(user => user.id === parseInt(req.params.id, 10));
}

function sendUserRoutes(app, router) {
  router.get('/', responseHandler.handleSuccess(findUsers));
  router.get('/:id', responseHandler.handleSuccess(findUserById));
  app.use('/api/v1/users', router);
}

module.exports = sendUserRoutes;
