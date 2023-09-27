const mysql = require('mysql');
const config = require('../../configurations/configurations');

const connection = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

connection.connect((error) => {
  if (error) throw error; 
  console.log(`Database: ${connection.config.database}`)
  console.log('Connected to database');
});

module.exports = connection;
