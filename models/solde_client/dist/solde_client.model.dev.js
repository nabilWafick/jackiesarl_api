"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require("../_db/database");

var Clients = require("../clients/clients.model");
/*
total_dettes_mois = `SELECT achat_client.id_client, SUM(achat_client.montant) AS total_dettes_mois FROM  achat_client WHERE id_client = 221 AND date_achat BETWEEN '2023-10-01' AND '2023-10-22' GROUP BY achat_client.id_client;`;

total_paiements_mois = `SELECT paiement_client.id_client, SUM(paiement_client.montant) AS total_paiements_mois FROM  paiement_client WHERE id_client = 221 AND est_valide = 1 AND date_paiement BETWEEN '2023-10-01' AND '2023-10-23'  GROUP BY paiement_client.id_client;`;

total_dettes_gobal = `SELECT achat_client.id_client, SUM(achat_client.montant) AS total_dettes_global FROM  achat_client WHERE id_client = 221 GROUP BY achat_client.id_client;`;

total_paiements_global = `SELECT paiement_client.id_client, SUM(paiement_client.montant) AS total_paiements_global FROM  paiement_client WHERE id_client = 221 AND est_valide = 1 GROUP BY paiement_client.id_client;`;

*/


var SoldeClient =
/*#__PURE__*/
function () {
  function SoldeClient(total_dettes, total_paiements, creance, avance) {
    _classCallCheck(this, SoldeClient);

    this.total_dettes = total_dettes, this.total_paiements = total_paiements, this.creance = creance, this.avance = avance;
  }

  _createClass(SoldeClient, null, [{
    key: "getByIdClient",
    value: function getByIdClient(id_client, callback) {
      // obtenir le total des dettes du mois
      var firstMonthDayDate = new Date();
      firstMonthDayDate.setDate(1), firstMonthDayDate.setHours(0, 0, 0); //  console.log("firstMonthDayDate", firstMonthDayDate.toLocaleString());

      var query_total_dettes_mois = "SELECT achat_client.id_client, SUM(achat_client.montant) AS total_dettes_mois FROM  achat_client WHERE id_client = ? AND date_achat BETWEEN ? AND ? GROUP BY achat_client.id_client;";
      connection.query(query_total_dettes_mois, [id_client, firstMonthDayDate, new Date()], function (error_total_dettes_mois, results) {
        var total_dettes_mois = 0;
        var total_paiements_mois = 0;
        var total_dettes_global = 0;
        var total_paiements_global = 0;

        if (error_total_dettes_mois) {
          return callback(error_total_dettes_mois, null);
        }

        if (results.length === 0) {
          total_dettes_mois = 0; // le client n'a pas acheté ce mois
        }

        total_dettes_mois = results[0].total_dettes_mois; // on obtient la dette de ce mois
        // obtenir le total des paiements de ce mois

        var query_total_paiements_mois = "SELECT paiement_client.id_client, SUM(paiement_client.montant) AS total_paiements_mois FROM  paiement_client WHERE id_client = ? AND est_valide = 1 AND date_paiement BETWEEN ? AND ?  GROUP BY paiement_client.id_client;";
        connection.query(query_total_paiements_mois, [id_client, firstMonthDayDate, new Date()], function (error_total_paiements_mois, results) {
          if (error_total_paiements_mois) {
            return callback(error_total_paiements_mois, null);
          }

          if (results.length === 0) {
            total_paiements_mois = 0; // le client n'a pas payé ce mois
          }

          total_paiements_mois = results[0].total_paiements_mois; // on obtient le payement de ce mois
          // obtenir le total des dettes

          var query_total_dettes_global = "SELECT achat_client.id_client, SUM(achat_client.montant) AS total_dettes_global FROM  achat_client WHERE id_client = ? GROUP BY achat_client.id_client;";
          connection.query(query_total_dettes_global, [id_client], function (error_total_dettes_global, results) {
            if (error_total_dettes_global) {
              return callback(error_total_dettes_global, null);
            }

            if (results.length === 0) {
              total_dettes_global = 0; // le client n'a jamais acheté
            }

            total_dettes_global = results[0].total_dettes_global; // on obtient le total des dettes
            // obtenir le total des paiements

            var query_total_paiements_global = "SELECT paiement_client.id_client, SUM(paiement_client.montant) AS total_paiements_global FROM  paiement_client WHERE id_client = ? AND est_valide = 1 GROUP BY paiement_client.id_client;";
            connection.query(query_total_paiements_global, [id_client], function (error_total_paiements_global, results) {
              if (error_total_paiements_global) {
                return callback(error_total_paiements_global, null);
              }

              if (results.length === 0) {
                total_paiements_global = 0; // le client n'a jamais payé
              }

              total_paiements_global = results[0].total_paiements_global; // on obtient le total des paiement
              // on détermine s'il s'agit d'une créance ou d'une avance

              if (total_dettes_global - total_paiements_global > 0) {
                var soldeClient = new SoldeClient(total_dettes_mois, total_paiements_mois, total_dettes_global - total_paiements_global, 0);
                return callback(null, soldeClient);
              } else {
                var _soldeClient = new SoldeClient(total_dettes_mois, total_paiements_mois, 0, total_paiements_global - total_dettes_global);

                return callback(null, _soldeClient);
              }
            });
          });
        });
      });
    }
  }]);

  return SoldeClient;
}();

module.exports = SoldeClient;