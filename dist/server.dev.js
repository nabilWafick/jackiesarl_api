"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var cors = require("cors");

var app = express();

var routes = require("./routes/routes"); //const config = require("./configurations/config");


var port = process.env.PORT;
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "PUT", "DELETE", "HEAD", "PATCH"],
  credentials: true
}));
app.use(cookieParser()); // Middleware pour analyser le corps des requêtes au format JSON

app.use(bodyParser.json()); // Utiliser les routes

app.use("/api", routes); // Démarrer le serveur

app.listen(port, function () {
  console.log("Serveur en cours d'ex\xE9cution sur le port ".concat(port));
});