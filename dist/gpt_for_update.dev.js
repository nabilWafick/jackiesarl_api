"use strict";

var express = require("express");

var mysql = require("mysql2");

var bodyParser = require("body-parser");

var app = express();
var port = 3000;
app.use(bodyParser.json()); // Configuration de la connexion à la base de données (à adapter à votre configuration)

var db = mysql.createConnection({
  host: "localhost",
  user: "votre_utilisateur",
  password: "votre_mot_de_passe",
  database: "votre_base_de_donnees"
}); // Route pour mettre à jour les permissions d'un employé par son ID

app.put("/employes/:id/permissions", function (req, res) {
  var id = req.params.id;
  var permissions = req.body.permissions;
  var updateQuery = "UPDATE employes SET permissions = ? WHERE id = ?";
  db.query(updateQuery, [JSON.stringify(permissions), id], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Erreur lors de la mise à jour des permissions"
      });
    } else if (result.affectedRows === 0) {
      res.status(404).json({
        message: "Employé non trouvé"
      });
    } else {
      res.status(200).json({
        message: "Permissions de l'employé mises à jour avec succès"
      });
    }
  });
});
app.listen(port, function () {
  console.log("Serveur en cours d'ex\xE9cution sur le port ".concat(port));
});