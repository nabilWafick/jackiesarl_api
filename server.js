const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");
const path = require("path");
const undefinedRoute = require("./routes/404/404.routes");

const port = process.env.PORT;

const publicsDirectory = path.join(__dirname, "public");
app.use(express.static(publicsDirectory));

const uploadsDirectory = path.join(__dirname, "uploads");
app.use(express.static(uploadsDirectory));

app.use(
  cors({
    origin: ["http://localhost:5173" /*, "http://192.168.203.65:5173"*/],
    methods: ["POST", "GET", "PUT", "DELETE", "HEAD", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Utiliser les routes
app.use("/api", routes);

// route vers la racine
app.use("/", undefinedRoute);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
