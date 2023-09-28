const mysql_connect = require('mysql');
const config = require('../../configurations/config');

const connection = mysql_connect.createConnection({
 // 
 /*
  host:config.dbHost,
  user:config.dbUser,
  password: config.dbPassword,
  database:config.dbName,
*/
 host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) throw error; 
  console.log(`error: ${error}`)
  console.log(`Host: ${connection.config.host}`)
  console.log(`User: ${connection.config.user}`)
  console.log(`Password: ${connection.config.password}`)
  console.log(`Database: ${connection.config.database}`)
  console.log('Connected to database');
});

module.exports = connection;
