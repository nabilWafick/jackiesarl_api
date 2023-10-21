"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require("../_db/database");

var Clients = require("../../models/clients/clients.model");

var ClientsTonnages =
/*#__PURE__*/
function () {
  function ClientsTonnages(client, tonnage_CIMBENIN, tonnage_NOCIBE, pourcentage_achat) {
    _classCallCheck(this, ClientsTonnages);

    this.client = client;
    this.tonnage_CIMBENIN = tonnage_CIMBENIN;
    this.tonnage_NOCIBE = tonnage_NOCIBE;
    this.pourcentage_achat = pourcentage_achat;
  }

  _createClass(ClientsTonnages, null, [{
    key: "getByIdClient",
    value: function getByIdClient(id_client, callback) {
      var query = "SELECT clients.id,clients.nom,clients.prenoms,clients.numero_ifu,clients.numero_telephone,clients.email,clients.date_ajout,\n    SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END) AS \"tonnage_CIMBENIN\",\n           SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END) AS \"tonnage_NOCIBE\",\n           (SUM(CASE WHEN categorie = 'CIM BENIN' OR categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END) / (SELECT SUM(quantite_achetee) FROM achat_client)) * 100 AS \"pourcentage_achat\"\n    FROM achat_client,clients\n    WHERE id_client = clients.id AND id_client = ?\n    GROUP BY id_client;";
      connection.query(query, [id_client], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Client par tonnage  non trouvé
        }

        var clientTonnages = results[0];
        var clientPurchasingTonnage = new ClientsTonnages(new Clients(clientTonnages.id, clientTonnages.nom, clientTonnages.prenoms, clientTonnages.numero_ifu, clientTonnages.numero_telephone, clientTonnages.email, clientTonnages.date_ajout), clientTonnages.tonnage_CIMBENIN, clientTonnages.tonnage_NOCIBE, clientTonnages.pourcentage_achat);
        return callback(null, clientPurchasingTonnage);
      });
    } // Méthode pour récupérer toutes les entrées de la table clients

  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "SELECT clients.id,clients.nom,clients.prenoms,clients.numero_ifu,clients.numero_telephone,clients.email,clients.date_ajout,\n    SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END) AS \"tonnage_CIMBENIN\",\n           SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END) AS \"tonnage_NOCIBE\",\n           (SUM(CASE WHEN categorie = 'CIM BENIN' OR categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END) / (SELECT SUM(quantite_achetee) FROM achat_client)) * 100 AS \"pourcentage_achat\"\n    FROM achat_client,clients\n    WHERE id_client = clients.id\n    GROUP BY id_client\n    ORDER BY pourcentage_achat DESC;";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var clientsTonnages = results.map(function (clientTonnages) {
          return new ClientsTonnages(new Clients(clientTonnages.id, clientTonnages.nom, clientTonnages.prenoms, clientTonnages.numero_ifu, clientTonnages.numero_telephone, clientTonnages.email, clientTonnages.date_ajout), clientTonnages.tonnage_CIMBENIN, clientTonnages.tonnage_NOCIBE, clientTonnages.pourcentage_achat);
        });
        return callback(null, clientsTonnages);
      });
    }
  }]);

  return ClientsTonnages;
}();

module.exports = ClientsTonnages;