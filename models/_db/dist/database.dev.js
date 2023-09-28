"use strict";

var mysql_connect = require('mysql');

var config = require('../../configurations/config');

var connection = mysql_connect.createConnection({
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
  database: process.env.DB_NAME
});
connection.connect(function (error) {
  if (error) throw error;
  console.log("error: ".concat(error));
  console.log("Host: ".concat(connection.config.host));
  console.log("User: ".concat(connection.config.user));
  console.log("Password: ".concat(connection.config.password));
  console.log("Database: ".concat(connection.config.database));
  console.log('Connected to database');
});
module.exports = connection;