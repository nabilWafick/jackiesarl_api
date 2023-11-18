"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var cors = require("cors");

var app = express();

var routes = require("./routes/routes");

var path = require("path");

var undefinedRoute = require("./routes/404/404.routes");

var port = process.env.PORT;
var publicsDirectory = path.join(__dirname, "public");
app.use(express["static"](publicsDirectory));
var uploadsDirectory = path.join(__dirname, "uploads");
app.use(express["static"](uploadsDirectory));
app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.203.65:5173"],
  methods: ["POST", "GET", "PUT", "DELETE", "HEAD", "PATCH"],
  credentials: true
}));
app.use(cookieParser()); // Middleware pour analyser le corps des requêtes au format JSON

app.use(bodyParser.json()); // Utiliser les routes

app.use("/api", routes); // route vers la racine

app.use("/", undefinedRoute); // Démarrer le serveur

app.listen(port, function () {
  console.log("Serveur en cours d'ex\xE9cution sur le port ".concat(port));
});