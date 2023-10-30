const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");
const config = require("./configurations/config");
const port = process.env.PORT;

app.use(cors());
app.use(cookieParser());

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Utiliser les routes
app.use("/api", routes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
