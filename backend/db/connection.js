const pg = require('pg');

const Client = pg.Client; // single connection to the database
// const Pool = pg.Pool; // collection of clients (5); managed

const config = {
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const client = new Client(config);

client.connect();

module.exports = client;