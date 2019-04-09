// require('dotenv/config');
const appConfig = require('../app.config');

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: appConfig.DB_NAME,
    user: appConfig.DB_USER,
    password: appConfig.DB_PASS,
  },
});

module.exports = knex;
