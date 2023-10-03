"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

var routes = require('./routes/routes');

var config = require('./configurations/config');

var port = process.env.PORT;
/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //next();
});
*/

app.use(cors()); // Middleware pour analyser le corps des requêtes au format JSON

app.use(bodyParser.json()); // Utiliser les routes

app.use('/api', routes); // Démarrer le serveur

app.listen(port, function () {
  console.log("Serveur en cours d'ex\xE9cution sur le port ".concat(port));
});