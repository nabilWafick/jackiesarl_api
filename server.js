const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');
const port = process.env.PORT || 7000;

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Utiliser les routes
app.use('/api', routes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
