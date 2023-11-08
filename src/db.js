const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'printerService',
  password: '1234',
  port: 5432, 
});

module.exports = pool;
