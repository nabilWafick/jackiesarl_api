const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes')
const config = require('./configurations/config');
const port = process.env.PORT;

/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //next();
});
*/

app.use(cors());

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Utiliser les routes
app.use('/api', routes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
