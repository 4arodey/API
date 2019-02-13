const responseHandler = require('../responseHandler');

const users = [
  {
    name: 'Olga',
    lastname: 'User',
  },
  {
    name: 'Vasia',
    lastname: 'User',
  },
  {
    name: 'Ivan',
    lastname: 'User',
  },
];


function findUsers() {
  return users;
}

function findUserById() {
  return users[0];
}

function sendUserRoutes(app, router) {
  router.get('/', responseHandler.handleSuccess(findUsers));
  router.get('/:id', responseHandler.handleSuccess(findUserById));
  app.use('/users', router);
}

module.exports = sendUserRoutes;
