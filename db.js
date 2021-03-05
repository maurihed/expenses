const Pool = require('pg').Pool;

module.exports = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'expenses',
  password: '1150',  
  port: 5432,
});
