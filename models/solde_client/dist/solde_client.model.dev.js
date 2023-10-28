"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require("../_db/database");

var Clients = require("../clients/clients.model");

var SoldeClient =
/*#__PURE__*/
function () {
  function SoldeClient(client, total_dettes_mois, total_paiements_mois, total_dettes_global, total_paiements_global, avance, creance, total_dettes_mois_CIMBENIN, total_dettes_mois_NOCIBE, total_paiements_mois_CIMBENIN, total_paiements_mois_NOCIBE, total_dettes_global_CIMBENIN, total_dettes_global_NOCIBE, total_paiements_global_CIMBENIN, total_paiements_global_NOCIBE, avance_CIMBENIN, avance_NOCIBE, creance_CIMBENIN, creance_NOCIBE, total_avance_CIMBENIN, total_avance_NOCIBE, total_creance_CIMBENIN, total_creance_NOCIBE, total_avance_clients, total_creance_clients, pourcentage_avance_client, pourcentage_creance_client) {
    _classCallCheck(this, SoldeClient);

    this.client = client;
    this.total_dettes_mois = total_dettes_mois;
    this.total_paiements_mois = total_paiements_mois;
    this.total_dettes_global = total_dettes_global;
    this.total_paiements_global = total_paiements_global;
    this.avance = avance;
    this.creance = creance;
    this.total_dettes_mois_CIMBENIN = total_dettes_mois_CIMBENIN;
    this.total_dettes_mois_NOCIBE = total_dettes_mois_NOCIBE;
    this.total_paiements_mois_CIMBENIN = total_paiements_mois_CIMBENIN;
    this.total_paiements_mois_NOCIBE = total_paiements_mois_NOCIBE;
    this.total_dettes_global_CIMBENIN = total_dettes_global_CIMBENIN;
    this.total_dettes_global_NOCIBE = total_dettes_global_NOCIBE;
    this.total_paiements_global_CIMBENIN = total_paiements_global_CIMBENIN;
    this.total_paiements_global_NOCIBE = total_paiements_global_NOCIBE;
    this.avance_CIMBENIN = avance_CIMBENIN;
    this.avance_NOCIBE = avance_NOCIBE;
    this.creance_CIMBENIN = creance_CIMBENIN;
    this.creance_NOCIBE = creance_NOCIBE;
    this.total_avance_CIMBENIN = total_avance_CIMBENIN, this.total_avance_NOCIBE = total_avance_NOCIBE, this.total_creance_CIMBENIN = total_creance_CIMBENIN, this.total_creance_NOCIBE = total_creance_NOCIBE, this.total_creance_clients = total_creance_clients;
    this.total_avance_clients = total_avance_clients;
    this.pourcentage_avance_client = pourcentage_avance_client;
    this.pourcentage_creance_client = pourcentage_creance_client;
  }

  _createClass(SoldeClient, null, [{
    key: "getByIdClient",
    value: function getByIdClient(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var queryClientBalence = "SELECT\n      clients.id,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout,\n      COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,\n      COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,\n      COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,\n      COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,\n      CASE\n          WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))\n          ELSE 0\n      END AS avance,\n      CASE\n          WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))\n          ELSE 0\n      END AS creance,\n      COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,\n      COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,\n      COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,\n      COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,\n      CASE\n          WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))\n          ELSE 0\n      END AS avance_CIMBENIN,\n      CASE\n          WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))\n          ELSE 0\n      END AS creance_CIMBENIN,\n      COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,\n      COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,\n      COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,\n      COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,\n      CASE\n          WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))\n          ELSE 0\n      END AS avance_NOCIBE,\n      CASE\n          WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))\n          ELSE 0\n      END AS creance_NOCIBE\n  FROM clients\n  LEFT JOIN\n  -- total dettes mois --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n     --  WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n       WHERE date_achat BETWEEN ? AND ? \n       GROUP BY id_client) AS achat\n  ON clients.id = achat.id_client\n  LEFT JOIN\n   -- total paiements mois --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n       --  AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n    AND date_paiement BETWEEN ? AND ? \n       GROUP BY id_client) AS paiement_mois\n  ON clients.id = paiement_mois.id_client\n  LEFT JOIN\n   -- total dettes global --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE achat_client.date_achat <= ?\n       GROUP BY id_client) AS dettes_global\n  ON clients.id = dettes_global.id_client\n  LEFT JOIN\n   -- total paiements global --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n        AND paiement_client.date_paiement <= ?\n       GROUP BY id_client) AS paiement_global\n  ON clients.id = paiement_global.id_client\n  LEFT JOIN\n   -- total dettes mois CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n    --   WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n        WHERE date_achat BETWEEN ? AND ? \n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS achat_cimbenin\n  ON clients.id = achat_cimbenin.id_client\n  LEFT JOIN\n   -- total paiements mois CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n      --   AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n        AND date_paiement BETWEEN ? AND ? \n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS paiement_mois_cimbenin\n  ON clients.id = paiement_mois_cimbenin.id_client\n  LEFT JOIN\n   -- total dettes global CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE categorie = 'CIM BENIN'\n        AND achat_client.date_achat <= ?\n       GROUP BY id_client) AS dettes_global_cimbenin\n  ON clients.id = dettes_global_cimbenin.id_client\n  LEFT JOIN\n   -- total paiements global CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND categorie = 'CIM BENIN'\n         AND paiement_client.date_paiement <= ?\n       GROUP BY id_client) AS paiement_global_cimbenin\n  ON clients.id = paiement_global_cimbenin.id_client\n  LEFT JOIN\n   -- total dettes mois NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n   --    WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         WHERE date_achat BETWEEN ? AND ? \n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS achat_nocibe\n  ON clients.id = achat_nocibe.id_client\n  LEFT JOIN\n  -- total paiements mois NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n      --   AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n        AND date_paiement BETWEEN ? AND ? \n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS paiement_mois_nocibe\n  ON clients.id = paiement_mois_nocibe.id_client\n  LEFT JOIN\n  -- total dettes global NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE categorie = 'NOCIBE'\n         AND achat_client.date_achat <= ?\n       GROUP BY id_client) AS dettes_global_nocibe\n  ON clients.id = dettes_global_nocibe.id_client\n  LEFT JOIN\n  -- total paiements global NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND categorie = 'NOCIBE'\n         AND paiement_client.date_paiement <= ?\n       GROUP BY id_client) AS paiement_global_nocibe\n  ON clients.id = paiement_global_nocibe.id_client;\n"; // WHERE clients.id = ?

        connection.query(queryClientBalence, [
        /*1 */
        startDate,
        /* 2*/
        endDate,
        /* 3*/
        startDate,
        /*4 */
        endDate,
        /* 5*/
        endDate,
        /* 6*/
        endDate,
        /* 7*/
        startDate,
        /* 8*/
        endDate,
        /* 9*/
        startDate,
        /* 10*/
        endDate,
        /*11 */
        endDate,
        /*12 */
        endDate,
        /* 13*/
        startDate,
        /*14 */
        endDate,
        /*15 */
        startDate,
        /* 16*/
        endDate,
        /* 17*/
        endDate,
        /*18 */
        endDate], function (errorClientBalence, results) {
          if (errorClientBalence) {
            return callback(errorClientBalence, null);
          }

          if (results.length === 0) {
            return callback(null, null);
          }

          var sumAvance = 0;
          var sumAvanceCIMBENIN = 0;
          var sumAvanceNOCIBE = 0;
          var sumCreance = 0;
          var sumCreanceCIMBENIN = 0;
          var sumCreanceNOCIBE = 0;
          var percentage_avance_client = 0;
          var percentage_creance_client = 0;
          results.forEach(function (solde) {
            sumAvance += solde.avance;
            sumAvanceCIMBENIN += solde.avance_CIMBENIN;
            sumAvanceNOCIBE += solde.avance_NOCIBE;
            sumCreance += solde.creance;
            sumCreanceCIMBENIN += solde.creance_CIMBENIN;
            sumCreanceNOCIBE += solde.creance_NOCIBE;
          });
          var soldeData = results.find(function (solde) {
            return solde.id == id_client;
          });
          console.log("soldeData", soldeData);
          percentage_avance_client = parseFloat((soldeData.avance * 100 / sumAvance).toFixed(3));
          percentage_creance_client = parseFloat((soldeData.creance * 100 / sumCreance).toFixed(3));
          var soldeClient = new SoldeClient(new Clients(soldeData.id, soldeData.nom, soldeData.prenoms, soldeData.numero_ifu, soldeData.numero_telephone, soldeData.email, soldeData.date_ajout), soldeData.total_dettes_mois, soldeData.total_paiements_mois, soldeData.total_dettes_global, soldeData.total_paiements_global, soldeData.avance, soldeData.creance, soldeData.total_dettes_mois_CIMBENIN, soldeData.total_dettes_mois_NOCIBE, soldeData.total_paiements_mois_CIMBENIN, soldeData.total_paiements_mois_NOCIBE, soldeData.total_dettes_global_CIMBENIN, soldeData.total_dettes_global_NOCIBE, soldeData.total_paiements_global_CIMBENIN, soldeData.total_paiements_global_NOCIBE, soldeData.avance_CIMBENIN, soldeData.avance_NOCIBE, soldeData.creance_CIMBENIN, soldeData.creance_NOCIBE, sumAvanceCIMBENIN, sumAvanceNOCIBE, sumCreanceCIMBENIN, sumCreanceNOCIBE, sumAvance, sumCreance, percentage_avance_client, percentage_creance_client);
          return callback(null, soldeClient);
        });
      } else {
        var _queryClientBalence = "SELECT\n      clients.id,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout,\n      COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,\n      COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,\n      COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,\n      COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,\n      CASE\n          WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))\n          ELSE 0\n      END AS avance,\n      CASE\n          WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))\n          ELSE 0\n      END AS creance,\n      COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,\n      COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,\n      COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,\n      COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,\n      CASE\n          WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))\n          ELSE 0\n      END AS avance_CIMBENIN,\n      CASE\n          WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))\n          ELSE 0\n      END AS creance_CIMBENIN,\n      COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,\n      COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,\n      COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,\n      COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,\n      CASE\n          WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))\n          ELSE 0\n      END AS avance_NOCIBE,\n      CASE\n          WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))\n          ELSE 0\n      END AS creance_NOCIBE\n  FROM clients\n  LEFT JOIN\n  -- total dettes mois --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n       GROUP BY id_client) AS achat\n  ON clients.id = achat.id_client\n  LEFT JOIN\n   -- total paiements mois --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n       GROUP BY id_client) AS paiement_mois\n  ON clients.id = paiement_mois.id_client\n  LEFT JOIN\n   -- total dettes global --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       GROUP BY id_client) AS dettes_global\n  ON clients.id = dettes_global.id_client\n  LEFT JOIN\n   -- total paiements global --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n       GROUP BY id_client) AS paiement_global\n  ON clients.id = paiement_global.id_client\n  LEFT JOIN\n   -- total dettes mois CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS achat_cimbenin\n  ON clients.id = achat_cimbenin.id_client\n  LEFT JOIN\n   -- total paiements mois CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS paiement_mois_cimbenin\n  ON clients.id = paiement_mois_cimbenin.id_client\n  LEFT JOIN\n   -- total dettes global CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE categorie = 'CIM BENIN'\n       GROUP BY id_client) AS dettes_global_cimbenin\n  ON clients.id = dettes_global_cimbenin.id_client\n  LEFT JOIN\n   -- total paiements global CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS paiement_global_cimbenin\n  ON clients.id = paiement_global_cimbenin.id_client\n  LEFT JOIN\n   -- total dettes mois NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS achat_nocibe\n  ON clients.id = achat_nocibe.id_client\n  LEFT JOIN\n  -- total paiements mois NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS paiement_mois_nocibe\n  ON clients.id = paiement_mois_nocibe.id_client\n  LEFT JOIN\n  -- total dettes global NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE categorie = 'NOCIBE'\n       GROUP BY id_client) AS dettes_global_nocibe\n  ON clients.id = dettes_global_nocibe.id_client\n  LEFT JOIN\n  -- total paiements global NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS paiement_global_nocibe\n  ON clients.id = paiement_global_nocibe.id_client;"; // WHERE clients.id = ?

        connection.query(_queryClientBalence, [new Date(startDate), new Date(endDate)], function (errorClientBalence, results) {
          if (errorClientBalence) {
            return callback(errorClientBalence, null);
          }

          if (results.length === 0) {
            return callback(null, null);
          }

          var sumAvance = 0;
          var sumAvanceCIMBENIN = 0;
          var sumAvanceNOCIBE = 0;
          var sumCreance = 0;
          var sumCreanceCIMBENIN = 0;
          var sumCreanceNOCIBE = 0;
          var percentage_avance_client = 0;
          var percentage_creance_client = 0;
          results.forEach(function (solde) {
            sumAvance += solde.avance;
            sumAvanceCIMBENIN += solde.avance_CIMBENIN;
            sumAvanceNOCIBE += solde.avance_NOCIBE;
            sumCreance += solde.creance;
            sumCreanceCIMBENIN += solde.creance_CIMBENIN;
            sumCreanceNOCIBE += solde.creance_NOCIBE;
          });
          var soldeData = results.find(function (solde) {
            return solde.id == id_client;
          });
          console.log("soldeData", soldeData);
          percentage_avance_client = parseFloat((soldeData.avance * 100 / sumAvance).toFixed(3));
          percentage_creance_client = parseFloat((soldeData.creance * 100 / sumCreance).toFixed(3));
          var soldeClient = new SoldeClient(new Clients(soldeData.id, soldeData.nom, soldeData.prenoms, soldeData.numero_ifu, soldeData.numero_telephone, soldeData.email, soldeData.date_ajout), soldeData.total_dettes_mois, soldeData.total_paiements_mois, soldeData.total_dettes_global, soldeData.total_paiements_global, soldeData.avance, soldeData.creance, soldeData.total_dettes_mois_CIMBENIN, soldeData.total_dettes_mois_NOCIBE, soldeData.total_paiements_mois_CIMBENIN, soldeData.total_paiements_mois_NOCIBE, soldeData.total_dettes_global_CIMBENIN, soldeData.total_dettes_global_NOCIBE, soldeData.total_paiements_global_CIMBENIN, soldeData.total_paiements_global_NOCIBE, soldeData.avance_CIMBENIN, soldeData.avance_NOCIBE, soldeData.creance_CIMBENIN, soldeData.creance_NOCIBE, sumAvanceCIMBENIN, sumAvanceNOCIBE, sumCreanceCIMBENIN, sumCreanceNOCIBE, sumAvance, sumCreance, percentage_avance_client, percentage_creance_client);
          return callback(null, soldeClient);
        });
      }
    }
  }, {
    key: "getAll",
    value: function getAll(startDate, endDate, callback) {
      if (startDate, endDate) {
        var queryClientBalence = "SELECT\n      clients.id,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout,\n      COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,\n      COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,\n      COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,\n      COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,\n      CASE\n          WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))\n          ELSE 0\n      END AS avance,\n      CASE\n          WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))\n          ELSE 0\n      END AS creance,\n      COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,\n      COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,\n      COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,\n      COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,\n      CASE\n          WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))\n          ELSE 0\n      END AS avance_CIMBENIN,\n      CASE\n          WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))\n          ELSE 0\n      END AS creance_CIMBENIN,\n      COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,\n      COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,\n      COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,\n      COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,\n      CASE\n          WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))\n          ELSE 0\n      END AS avance_NOCIBE,\n      CASE\n          WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))\n          ELSE 0\n      END AS creance_NOCIBE\n  FROM clients\n  LEFT JOIN\n  -- total dettes mois --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n     --  WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n       WHERE date_achat BETWEEN ? AND ? \n       GROUP BY id_client) AS achat\n  ON clients.id = achat.id_client\n  LEFT JOIN\n   -- total paiements mois --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n       --  AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n    AND date_paiement BETWEEN ? AND ? \n       GROUP BY id_client) AS paiement_mois\n  ON clients.id = paiement_mois.id_client\n  LEFT JOIN\n   -- total dettes global --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE achat_client.date_achat <= ?\n       GROUP BY id_client) AS dettes_global\n  ON clients.id = dettes_global.id_client\n  LEFT JOIN\n   -- total paiements global --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n        AND paiement_client.date_paiement <= ?\n       GROUP BY id_client) AS paiement_global\n  ON clients.id = paiement_global.id_client\n  LEFT JOIN\n   -- total dettes mois CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n    --   WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n        WHERE date_achat BETWEEN ? AND ? \n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS achat_cimbenin\n  ON clients.id = achat_cimbenin.id_client\n  LEFT JOIN\n   -- total paiements mois CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n      --   AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n        AND date_paiement BETWEEN ? AND ? \n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS paiement_mois_cimbenin\n  ON clients.id = paiement_mois_cimbenin.id_client\n  LEFT JOIN\n   -- total dettes global CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE categorie = 'CIM BENIN'\n        AND achat_client.date_achat <= ?\n       GROUP BY id_client) AS dettes_global_cimbenin\n  ON clients.id = dettes_global_cimbenin.id_client\n  LEFT JOIN\n   -- total paiements global CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND categorie = 'CIM BENIN'\n         AND paiement_client.date_paiement <= ?\n       GROUP BY id_client) AS paiement_global_cimbenin\n  ON clients.id = paiement_global_cimbenin.id_client\n  LEFT JOIN\n   -- total dettes mois NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n   --    WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         WHERE date_achat BETWEEN ? AND ? \n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS achat_nocibe\n  ON clients.id = achat_nocibe.id_client\n  LEFT JOIN\n  -- total paiements mois NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n      --   AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n        AND date_paiement BETWEEN ? AND ? \n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS paiement_mois_nocibe\n  ON clients.id = paiement_mois_nocibe.id_client\n  LEFT JOIN\n  -- total dettes global NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE categorie = 'NOCIBE'\n         AND achat_client.date_achat <= ?\n       GROUP BY id_client) AS dettes_global_nocibe\n  ON clients.id = dettes_global_nocibe.id_client\n  LEFT JOIN\n  -- total paiements global NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND categorie = 'NOCIBE'\n         AND paiement_client.date_paiement <= ?\n       GROUP BY id_client) AS paiement_global_nocibe\n  ON clients.id = paiement_global_nocibe.id_client;\n";
        connection.query(queryClientBalence, [
        /*1 */
        startDate,
        /* 2*/
        endDate,
        /* 3*/
        startDate,
        /*4 */
        endDate,
        /* 5*/
        endDate,
        /* 6*/
        endDate,
        /* 7*/
        startDate,
        /* 8*/
        endDate,
        /* 9*/
        startDate,
        /* 10*/
        endDate,
        /*11 */
        endDate,
        /*12 */
        endDate,
        /* 13*/
        startDate,
        /*14 */
        endDate,
        /*15 */
        startDate,
        /* 16*/
        endDate,
        /* 17*/
        endDate,
        /*18 */
        endDate], function (errorClientBalence, results) {
          if (errorClientBalence) {
            return callback(errorClientBalence, null);
          }

          var sumAvance = 0;
          var sumAvanceCIMBENIN = 0;
          var sumAvanceNOCIBE = 0;
          var sumCreance = 0;
          var sumCreanceCIMBENIN = 0;
          var sumCreanceNOCIBE = 0;
          var percentage_avance_client = 0;
          var percentage_creance_client = 0;
          results.forEach(function (solde) {
            sumAvance += solde.avance;
            sumAvanceCIMBENIN += solde.avance_CIMBENIN;
            sumAvanceNOCIBE += solde.avance_NOCIBE;
            sumCreance += solde.creance;
            sumCreanceCIMBENIN += solde.creance_CIMBENIN;
            sumCreanceNOCIBE += solde.creance_NOCIBE;
          });
          var soldeList = results.map(function (soldeData) {
            percentage_avance_client = parseFloat((soldeData.avance * 100 / sumAvance).toFixed(3));
            percentage_creance_client = parseFloat((soldeData.creance * 100 / sumCreance).toFixed(3));
            return new SoldeClient(new Clients(soldeData.id, soldeData.nom, soldeData.prenoms, soldeData.numero_ifu, soldeData.numero_telephone, soldeData.email, soldeData.date_ajout), soldeData.total_dettes_mois, soldeData.total_paiements_mois, soldeData.total_dettes_global, soldeData.total_paiements_global, soldeData.avance, soldeData.creance, soldeData.total_dettes_mois_CIMBENIN, soldeData.total_dettes_mois_NOCIBE, soldeData.total_paiements_mois_CIMBENIN, soldeData.total_paiements_mois_NOCIBE, soldeData.total_dettes_global_CIMBENIN, soldeData.total_dettes_global_NOCIBE, soldeData.total_paiements_global_CIMBENIN, soldeData.total_paiements_global_NOCIBE, soldeData.avance_CIMBENIN, soldeData.avance_NOCIBE, soldeData.creance_CIMBENIN, soldeData.creance_NOCIBE, sumAvanceCIMBENIN, sumAvanceNOCIBE, sumCreanceCIMBENIN, sumCreanceNOCIBE, sumAvance, sumCreance, percentage_avance_client, percentage_creance_client);
          });
          return callback(null, soldeList);
        });
      } else {
        var _queryClientBalence2 = "SELECT\n      clients.id,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout,\n      COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,\n      COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,\n      COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,\n      COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,\n      CASE\n          WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))\n          ELSE 0\n      END AS avance,\n      CASE\n          WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))\n          ELSE 0\n      END AS creance,\n      COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,\n      COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,\n      COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,\n      COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,\n      CASE\n          WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))\n          ELSE 0\n      END AS avance_CIMBENIN,\n      CASE\n          WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))\n          ELSE 0\n      END AS creance_CIMBENIN,\n      COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,\n      COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,\n      COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,\n      COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,\n      CASE\n          WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))\n          ELSE 0\n      END AS avance_NOCIBE,\n      CASE\n          WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))\n          ELSE 0\n      END AS creance_NOCIBE\n  FROM clients\n  LEFT JOIN\n  -- total dettes mois --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n       GROUP BY id_client) AS achat\n  ON clients.id = achat.id_client\n  LEFT JOIN\n   -- total paiements mois --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n       GROUP BY id_client) AS paiement_mois\n  ON clients.id = paiement_mois.id_client\n  LEFT JOIN\n   -- total dettes global --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       GROUP BY id_client) AS dettes_global\n  ON clients.id = dettes_global.id_client\n  LEFT JOIN\n   -- total paiements global --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n       GROUP BY id_client) AS paiement_global\n  ON clients.id = paiement_global.id_client\n  LEFT JOIN\n   -- total dettes mois CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS achat_cimbenin\n  ON clients.id = achat_cimbenin.id_client\n  LEFT JOIN\n   -- total paiements mois CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS paiement_mois_cimbenin\n  ON clients.id = paiement_mois_cimbenin.id_client\n  LEFT JOIN\n   -- total dettes global CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE categorie = 'CIM BENIN'\n       GROUP BY id_client) AS dettes_global_cimbenin\n  ON clients.id = dettes_global_cimbenin.id_client\n  LEFT JOIN\n   -- total paiements global CIM BENIN --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND categorie = 'CIM BENIN'\n       GROUP BY id_client) AS paiement_global_cimbenin\n  ON clients.id = paiement_global_cimbenin.id_client\n  LEFT JOIN\n   -- total dettes mois NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_dettes_mois\n       FROM achat_client\n       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS achat_nocibe\n  ON clients.id = achat_nocibe.id_client\n  LEFT JOIN\n  -- total paiements mois NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_paiements_mois\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()\n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS paiement_mois_nocibe\n  ON clients.id = paiement_mois_nocibe.id_client\n  LEFT JOIN\n  -- total dettes global NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_dettes_global\n       FROM achat_client\n       WHERE categorie = 'NOCIBE'\n       GROUP BY id_client) AS dettes_global_nocibe\n  ON clients.id = dettes_global_nocibe.id_client\n  LEFT JOIN\n  -- total paiements global NOCIBE --\n      (SELECT id_client, SUM(montant) AS total_paiements_global\n       FROM paiement_client\n       WHERE est_valide = 1\n         AND categorie = 'NOCIBE'\n       GROUP BY id_client) AS paiement_global_nocibe\n  ON clients.id = paiement_global_nocibe.id_client;";
        connection.query(_queryClientBalence2, function (errorClientBalence, results) {
          if (errorClientBalence) {
            return callback(errorClientBalence, null);
          }

          var sumAvance = 0;
          var sumAvanceCIMBENIN = 0;
          var sumAvanceNOCIBE = 0;
          var sumCreance = 0;
          var sumCreanceCIMBENIN = 0;
          var sumCreanceNOCIBE = 0;
          var percentage_avance_client = 0;
          var percentage_creance_client = 0;
          results.forEach(function (solde) {
            sumAvance += solde.avance;
            sumAvanceCIMBENIN += solde.avance_CIMBENIN;
            sumAvanceNOCIBE += solde.avance_NOCIBE;
            sumCreance += solde.creance;
            sumCreanceCIMBENIN += solde.creance_CIMBENIN;
            sumCreanceNOCIBE += solde.creance_NOCIBE;
          });
          var soldeList = results.map(function (soldeData) {
            percentage_avance_client = parseFloat((soldeData.avance * 100 / sumAvance).toFixed(3));
            percentage_creance_client = parseFloat((soldeData.creance * 100 / sumCreance).toFixed(3));
            return new SoldeClient(new Clients(soldeData.id, soldeData.nom, soldeData.prenoms, soldeData.numero_ifu, soldeData.numero_telephone, soldeData.email, soldeData.date_ajout), soldeData.total_dettes_mois, soldeData.total_paiements_mois, soldeData.total_dettes_global, soldeData.total_paiements_global, soldeData.avance, soldeData.creance, soldeData.total_dettes_mois_CIMBENIN, soldeData.total_dettes_mois_NOCIBE, soldeData.total_paiements_mois_CIMBENIN, soldeData.total_paiements_mois_NOCIBE, soldeData.total_dettes_global_CIMBENIN, soldeData.total_dettes_global_NOCIBE, soldeData.total_paiements_global_CIMBENIN, soldeData.total_paiements_global_NOCIBE, soldeData.avance_CIMBENIN, soldeData.avance_NOCIBE, soldeData.creance_CIMBENIN, soldeData.creance_NOCIBE, sumAvanceCIMBENIN, sumAvanceNOCIBE, sumCreanceCIMBENIN, sumCreanceNOCIBE, sumAvance, sumCreance, percentage_avance_client, percentage_creance_client);
          });
          return callback(null, soldeList);
        });
      }
    }
  }]);

  return SoldeClient;
}();

module.exports = SoldeClient; // Prepared Request

/**

SELECT
      clients.id,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout,
      COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,
      COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,
      COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,
      COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,
      CASE
          WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))
          ELSE 0
      END AS avance,
      CASE
          WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))
          ELSE 0
      END AS creance,
      COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,
      COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,
      COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,
      COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,
      CASE
          WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))
          ELSE 0
      END AS avance_CIMBENIN,
      CASE
          WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))
          ELSE 0
      END AS creance_CIMBENIN,
      COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,
      COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,
      COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,
      COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,
      CASE
          WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))
          ELSE 0
      END AS avance_NOCIBE,
      CASE
          WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))
          ELSE 0
      END AS creance_NOCIBE
  FROM clients
  LEFT JOIN
  -- total dettes mois --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
     --  WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       WHERE date_achat BETWEEN ? AND ? 
       GROUP BY id_client) AS achat
  ON clients.id = achat.id_client
  LEFT JOIN
   -- total paiements mois --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
       --  AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
    AND date_paiement BETWEEN ? AND ? 
       GROUP BY id_client) AS paiement_mois
  ON clients.id = paiement_mois.id_client
  LEFT JOIN
   -- total dettes global --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE achat_client.date_achat <= ?
       GROUP BY id_client) AS dettes_global
  ON clients.id = dettes_global.id_client
  LEFT JOIN
   -- total paiements global --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
        AND paiement_client.date_paiement <= ?
       GROUP BY id_client) AS paiement_global
  ON clients.id = paiement_global.id_client
  LEFT JOIN
   -- total dettes mois CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
    --   WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
        WHERE date_achat BETWEEN ? AND ? 
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS achat_cimbenin
  ON clients.id = achat_cimbenin.id_client
  LEFT JOIN
   -- total paiements mois CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
      --   AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
        AND date_paiement BETWEEN ? AND ? 
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS paiement_mois_cimbenin
  ON clients.id = paiement_mois_cimbenin.id_client
  LEFT JOIN
   -- total dettes global CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE categorie = 'CIM BENIN'
        AND achat_client.date_achat <= ?
       GROUP BY id_client) AS dettes_global_cimbenin
  ON clients.id = dettes_global_cimbenin.id_client
  LEFT JOIN
   -- total paiements global CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
         AND categorie = 'CIM BENIN'
         AND paiement_client.date_paiement <= ?
       GROUP BY id_client) AS paiement_global_cimbenin
  ON clients.id = paiement_global_cimbenin.id_client
  LEFT JOIN
   -- total dettes mois NOCIBE --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
   --    WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
         WHERE date_achat BETWEEN ? AND ? 
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS achat_nocibe
  ON clients.id = achat_nocibe.id_client
  LEFT JOIN
  -- total paiements mois NOCIBE --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
      --   AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
        AND date_paiement BETWEEN ? AND ? 
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS paiement_mois_nocibe
  ON clients.id = paiement_mois_nocibe.id_client
  LEFT JOIN
  -- total dettes global NOCIBE --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE categorie = 'NOCIBE'
         AND achat_client.date_achat <= ?
       GROUP BY id_client) AS dettes_global_nocibe
  ON clients.id = dettes_global_nocibe.id_client
  LEFT JOIN
  -- total paiements global NOCIBE --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
         AND categorie = 'NOCIBE'
         AND paiement_client.date_paiement <= ?
       GROUP BY id_client) AS paiement_global_nocibe
  ON clients.id = paiement_global_nocibe.id_client;

  
*/
// Better Best Commented Request

/**

SELECT
      clients.id,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout,
      COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,
      COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,
      COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,
      COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,
      CASE
          WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))
          ELSE 0
      END AS avance,
      CASE
          WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))
          ELSE 0
      END AS creance,
      COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,
      COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,
      COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,
      COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,
      CASE
          WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))
          ELSE 0
      END AS avance_CIMBENIN,
      CASE
          WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))
          ELSE 0
      END AS creance_CIMBENIN,
      COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,
      COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,
      COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,
      COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,
      CASE
          WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))
          ELSE 0
      END AS avance_NOCIBE,
      CASE
          WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))
          ELSE 0
      END AS creance_NOCIBE
  FROM clients
  LEFT JOIN
  -- total dettes mois --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
     --  WHERE date_achat BETWEEN 1startDate AND 2endDate --
       GROUP BY id_client) AS achat
  ON clients.id = achat.id_client
  LEFT JOIN
   -- total paiements mois --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
   -- AND date_paiement BETWEEN 3startDate AND 4endDate --
       GROUP BY id_client) AS paiement_mois
  ON clients.id = paiement_mois.id_client
  LEFT JOIN
   -- total dettes global --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
     --  WHERE achat_client.date_achat <= 5endDate
       GROUP BY id_client) AS dettes_global
  ON clients.id = dettes_global.id_client
  LEFT JOIN
   -- total paiements global --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
       -- AND paiement_client.date_paiement <= 6endDate
       GROUP BY id_client) AS paiement_global
  ON clients.id = paiement_global.id_client
  LEFT JOIN
   -- total dettes mois CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       --  WHERE date_achat BETWEEN 7startDate AND 8endDate --
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS achat_cimbenin
  ON clients.id = achat_cimbenin.id_client
  LEFT JOIN
   -- total paiements mois CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       -- AND date_paiement BETWEEN 9startDate AND 10endDate --
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS paiement_mois_cimbenin
  ON clients.id = paiement_mois_cimbenin.id_client
  LEFT JOIN
   -- total dettes global CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE categorie = 'CIM BENIN'
       --  AND achat_client.date_achat <= 11endDate
       GROUP BY id_client) AS dettes_global_cimbenin
  ON clients.id = dettes_global_cimbenin.id_client
  LEFT JOIN
   -- total paiements global CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
         AND categorie = 'CIM BENIN'
        -- AND paiement_client.date_paiement <= 12endDate
       GROUP BY id_client) AS paiement_global_cimbenin
  ON clients.id = paiement_global_cimbenin.id_client
  LEFT JOIN
   -- total dettes mois NOCIBE --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       --  WHERE date_achat BETWEEN 13startDate AND 14endDate --
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS achat_nocibe
  ON clients.id = achat_nocibe.id_client
  LEFT JOIN
  -- total paiements mois NOCIBE --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       -- AND date_paiement BETWEEN 15startDate AND 16endDate --
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS paiement_mois_nocibe
  ON clients.id = paiement_mois_nocibe.id_client
  LEFT JOIN
  -- total dettes global NOCIBE --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE categorie = 'NOCIBE'
       --  AND achat_client.date_achat <= 17endDate
       GROUP BY id_client) AS dettes_global_nocibe
  ON clients.id = dettes_global_nocibe.id_client
  LEFT JOIN
  -- total paiements global NOCIBE --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
         AND categorie = 'NOCIBE'
        -- AND paiement_client.date_paiement <= 18endDate
       GROUP BY id_client) AS paiement_global_nocibe
  ON clients.id = paiement_global_nocibe.id_client;

**/
// Best Commented Request

/** 
SELECT
      clients.id,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout,
      COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,
      COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,
      COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,
      COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,
      CASE
          WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))
          ELSE 0
      END AS avance,
      CASE
          WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))
          ELSE 0
      END AS creance,
      COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,
      COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,
      COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,
      COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,
      CASE
          WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))
          ELSE 0
      END AS avance_CIMBENIN,
      CASE
          WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))
          ELSE 0
      END AS creance_CIMBENIN,
      COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,
      COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,
      COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,
      COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,
      CASE
          WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))
          ELSE 0
      END AS avance_NOCIBE,
      CASE
          WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))
          ELSE 0
      END AS creance_NOCIBE
  FROM clients
  LEFT JOIN
  -- total dettes mois --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
     --  WHERE date_achat BETWEEN startDate AND endDate --
       GROUP BY id_client) AS achat
  ON clients.id = achat.id_client
  LEFT JOIN
   -- total paiements mois --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
   -- AND date_paiement BETWEEN startDate AND endDate --
       GROUP BY id_client) AS paiement_mois
  ON clients.id = paiement_mois.id_client
  LEFT JOIN
   -- total dettes global --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
     --  WHERE achat_client.date_achat <= endDate
       GROUP BY id_client) AS dettes_global
  ON clients.id = dettes_global.id_client
  LEFT JOIN
   -- total paiements global --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
       -- AND paiement_client.date_paiement <= endDate
       GROUP BY id_client) AS paiement_global
  ON clients.id = paiement_global.id_client
  LEFT JOIN
   -- total dettes mois CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       --  WHERE date_achat BETWEEN startDate AND endDate --
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS achat_cimbenin
  ON clients.id = achat_cimbenin.id_client
  LEFT JOIN
   -- total paiements mois CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       -- AND date_paiement BETWEEN startDate AND endDate --
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS paiement_mois_cimbenin
  ON clients.id = paiement_mois_cimbenin.id_client
  LEFT JOIN
   -- total dettes global CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE categorie = 'CIM BENIN'
       --  AND achat_client.date_achat <= endDate
       GROUP BY id_client) AS dettes_global_cimbenin
  ON clients.id = dettes_global_cimbenin.id_client
  LEFT JOIN
   -- total paiements global CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
         AND categorie = 'CIM BENIN'
        -- AND paiement_client.date_paiement <= endDate
       GROUP BY id_client) AS paiement_global_cimbenin
  ON clients.id = paiement_global_cimbenin.id_client
  LEFT JOIN
   -- total dettes mois NOCIBE --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       --  WHERE date_achat BETWEEN startDate AND endDate --
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS achat_nocibe
  ON clients.id = achat_nocibe.id_client
  LEFT JOIN
  -- total paiements mois NOCIBE --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       -- AND date_paiement BETWEEN startDate AND endDate --
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS paiement_mois_nocibe
  ON clients.id = paiement_mois_nocibe.id_client
  LEFT JOIN
  -- total dettes global NOCIBE --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE categorie = 'NOCIBE'
       --  AND achat_client.date_achat <= endDate
       GROUP BY id_client) AS dettes_global_nocibe
  ON clients.id = dettes_global_nocibe.id_client
  LEFT JOIN
  -- total paiements global NOCIBE --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
         AND categorie = 'NOCIBE'
        -- AND paiement_client.date_paiement <= endDate
       GROUP BY id_client) AS paiement_global_nocibe
  ON clients.id = paiement_global_nocibe.id_client;
**/
// Commented Request

/** 

SELECT
      clients.id,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout,
      COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,
      COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,
      COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,
      COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,
      CASE
          WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))
          ELSE 0
      END AS avance,
      CASE
          WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))
          ELSE 0
      END AS creance,
      COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,
      COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,
      COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,
      COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,
      CASE
          WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))
          ELSE 0
      END AS avance_CIMBENIN,
      CASE
          WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))
          ELSE 0
      END AS creance_CIMBENIN,
      COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,
      COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,
      COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,
      COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,
      CASE
          WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))
          ELSE 0
      END AS avance_NOCIBE,
      CASE
          WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))
          ELSE 0
      END AS creance_NOCIBE
  FROM clients
  LEFT JOIN
  -- total dettes mois --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       GROUP BY id_client) AS achat
  ON clients.id = achat.id_client
  LEFT JOIN
   -- total paiements mois --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
       GROUP BY id_client) AS paiement_mois
  ON clients.id = paiement_mois.id_client
  LEFT JOIN
   -- total dettes global --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       GROUP BY id_client) AS dettes_global
  ON clients.id = dettes_global.id_client
  LEFT JOIN
   -- total paiements global --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
       GROUP BY id_client) AS paiement_global
  ON clients.id = paiement_global.id_client
  LEFT JOIN
   -- total dettes mois CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS achat_cimbenin
  ON clients.id = achat_cimbenin.id_client
  LEFT JOIN
   -- total paiements mois CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS paiement_mois_cimbenin
  ON clients.id = paiement_mois_cimbenin.id_client
  LEFT JOIN
   -- total dettes global CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE categorie = 'CIM BENIN'
       GROUP BY id_client) AS dettes_global_cimbenin
  ON clients.id = dettes_global_cimbenin.id_client
  LEFT JOIN
   -- total paiements global CIM BENIN --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
         AND categorie = 'CIM BENIN'
       GROUP BY id_client) AS paiement_global_cimbenin
  ON clients.id = paiement_global_cimbenin.id_client
  LEFT JOIN
   -- total dettes mois NOCIBE --
      (SELECT id_client, SUM(montant) AS total_dettes_mois
       FROM achat_client
       WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS achat_nocibe
  ON clients.id = achat_nocibe.id_client
  LEFT JOIN
  -- total paiements mois NOCIBE --
      (SELECT id_client, SUM(montant) AS total_paiements_mois
       FROM paiement_client
       WHERE est_valide = 1
         AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS paiement_mois_nocibe
  ON clients.id = paiement_mois_nocibe.id_client
  LEFT JOIN
  -- total dettes global NOCIBE --
      (SELECT id_client, SUM(montant) AS total_dettes_global
       FROM achat_client
       WHERE categorie = 'NOCIBE'
       GROUP BY id_client) AS dettes_global_nocibe
  ON clients.id = dettes_global_nocibe.id_client
  LEFT JOIN
  -- total paiements global NOCIBE --
      (SELECT id_client, SUM(montant) AS total_paiements_global
       FROM paiement_client
       WHERE est_valide = 1
         AND categorie = 'NOCIBE'
       GROUP BY id_client) AS paiement_global_nocibe
  ON clients.id = paiement_global_nocibe.id_client;

**/