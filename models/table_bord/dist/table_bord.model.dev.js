"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require("../_db/database");

var SoldeClient = require("../../models/solde_client/solde_client.model");

var TableBord =
/*#__PURE__*/
function () {
  function TableBord() {
    _classCallCheck(this, TableBord);
  }

  _createClass(TableBord, null, [{
    key: "getWeekDailyPayments",
    value: function getWeekDailyPayments(callback) {
      var query = "\n          SELECT DISTINCT CASE \n          WHEN jours.days = 'Monday' THEN 'Lundi'\n          WHEN jours.days = 'Tuesday' THEN 'Mardi'\n          WHEN jours.days = 'Wednesday' THEN 'Mercredi'\n          WHEN jours.days = 'Thursday' THEN 'Jeudi'\n          WHEN jours.days = 'Friday' THEN 'Vendredi'\n          WHEN jours.days = 'Saturday' THEN 'Samedi'\n          WHEN jours.days = 'Sunday' THEN 'Dimanche'\n        END AS jour, COALESCE(SUM(paiement_client.montant),0) as total_paiement_journalier from jours\n      LEFT JOIN paiement_client\n      ON jours.days = DAYNAME(paiement_client.date_paiement)\n      AND WEEK(paiement_client.date_paiement) = WEEK(CURRENT_DATE) AND paiement_client.est_valide =1\n      GROUP by jours.days ORDER BY\n        FIELD(jour, 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi','Dimanche')      \n    ";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var paiementsJournaliers = results.map(function (paiementJournalier) {
          return {
            jour: paiementJournalier.jour,
            total_paiement: paiementJournalier.total_paiement_journalier
          };
        });
        return callback(null, paiementsJournaliers);
      });
    }
  }, {
    key: "getDailyRegisteredCustumersTotal",
    value: function getDailyRegisteredCustumersTotal(isToday, callback) {
      if (isToday == 1) {
        var query = "\n            SELECT COUNT(*) AS total_journalier_clients_inscrits\n            FROM clients\n            WHERE DATE(date_ajout) = CURDATE()";
        connection.query(query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, {
            total_clients_incrits: results[0].total_journalier_clients_inscrits
          });
        });
      } else {
        var _query = "\n            SELECT COUNT(*) AS total_journalier_clients_inscrits\n            FROM clients\n            WHERE DATE(date_ajout) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)";
        connection.query(_query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, {
            total_clients_incrits: results[0].total_journalier_clients_inscrits
          });
        });
      }
    } // static getDailyRegisteredCustumersTotal(isToday, callback) {
    //   if (isToday==1) {
    //     const query = `
    //           SELECT COUNT(*) AS total_journalier_clients_inscrits
    //           FROM clients
    //           WHERE DATE(date_ajout) = CURDATE()`;
    //     connection.query(query, (error, results) => {
    //       if (error) {
    //         return callback(error, null);
    //       }
    //       if (results.length == 0) {
    //         return callback(null, null);
    //       }
    //       return callback(null, results[0].total_journalier_clients_inscrits);
    //     });
    //   } else {
    //     const query = `
    //           SELECT COUNT(*) AS total_journalier_clients_inscrits
    //           FROM clients
    //           WHERE DATE(date_ajout) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`;
    //     connection.query(query, (error, results) => {
    //       if (error) {
    //         return callback(error, null);
    //       }
    //       if (results.length == 0) {
    //         return callback(null, null);
    //       }
    //       return callback(null, results[0].total_journalier_clients_inscrits);
    //     });
    //   }
    // }

  }, {
    key: "getDailySalesTotal",
    value: function getDailySalesTotal(isToday, callback) {
      if (isToday == 1) {
        var query = "\n      SELECT COALESCE(SUM(montant),0) AS total_vente_journaliere\n      FROM achat_client\n      WHERE DATE(date_achat) = CURDATE()";
        connection.query(query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, {
            total_vente: results[0].total_vente_journaliere
          });
        });
      } else {
        var _query2 = "\n      SELECT COALESCE(SUM(montant),0) AS total_vente_journaliere\n      FROM achat_client\n      WHERE DATE(date_achat) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)\n      ";
        connection.query(_query2, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, {
            total_vente: results[0].total_vente_journaliere
          });
        });
      }
    }
  }, {
    key: "getDailyCompanyPurchases",
    value: function getDailyCompanyPurchases(isToday, callback) {
      if (isToday == 1) {
        var query = "\n        SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END),0)\n        AS total_journalier_achat_entreprise_CIMBENIN,\n        COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END),0)\n        AS total_journalier_achat_entreprise_NOCIBE\n        FROM achat_entreprise\n        WHERE DATE(date_achat) = CURDATE()\n      ";
        connection.query(query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            categorie: "CIM BENIN",
            total_achat: results[0].total_journalier_achat_entreprise_CIMBENIN
          }, {
            categorie: "NOCIBE",
            total_achat: results[0].total_journalier_achat_entreprise_NOCIBE
          }]);
        });
      } else {
        var _query3 = "\n        SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END),0)\n        AS total_journalier_achat_entreprise_CIMBENIN,\n        COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END),0)\n        AS total_journalier_achat_entreprise_NOCIBE\n        FROM achat_entreprise\n        WHERE DATE(date_achat) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)\n      ";
        connection.query(_query3, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            categorie: "CIM BENIN",
            total_achat: results[0].total_journalier_achat_entreprise_CIMBENIN
          }, {
            categorie: "NOCIBE",
            total_achat: results[0].total_journalier_achat_entreprise_NOCIBE
          }]);
        });
      }
    }
  }, {
    key: "getDailyUntraitedOrdersTotal",
    value: function getDailyUntraitedOrdersTotal(isToday, callback) {
      if (isToday == 1) {
        var query = "\n        SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN 1 ELSE 0 END),0)\n        AS commande_journaliere_non_traitee_CIMBENIN,\n        COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN 1 ELSE 0 END),0)\n        AS commande_journaliere_non_traitee_NOCIBE\n        FROM commandes\n        WHERE DATE(date_commande) = CURDATE()\n        AND est_traitee = 0;\n      ";
        connection.query(query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            categorie: "CIM BENIN",
            total_commande_non_traitee: results[0].commande_journaliere_non_traitee_CIMBENIN
          }, {
            categorie: "NOCIBE",
            total_commande_non_traitee: results[0].commande_journaliere_non_traitee_NOCIBE
          }]);
        });
      } else {
        var _query4 = "\n        SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN 1 ELSE 0 END),0)\n        AS commande_journaliere_non_traitee_CIMBENIN,\n        COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN 1 ELSE 0 END),0)\n        AS commande_journaliere_non_traitee_NOCIBE\n        FROM commandes\n        WHERE DATE(date_commande) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)\n        AND est_traitee = 0;\n      ";
        connection.query(_query4, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            categorie: "CIM BENIN",
            total_commande_non_traitee: results[0].commande_journaliere_non_traitee_CIMBENIN
          }, {
            categorie: "NOCIBE",
            total_commande_non_traitee: results[0].commande_journaliere_non_traitee_NOCIBE
          }]);
        });
      }
    }
  }, {
    key: "getDailyTraitedOrdersTotal",
    value: function getDailyTraitedOrdersTotal(isToday, callback) {
      if (isToday == 1) {
        var query = "\n      SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN 1 ELSE 0 END),0)\n      AS commande_journaliere_traitee_CIMBENIN,\n      COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN 1 ELSE 0 END),0)\n      AS commande_journaliere_traitee_NOCIBE\n      FROM commandes\n      WHERE DATE(date_commande) = CURDATE()\n      AND est_traitee = 1\n      ";
        connection.query(query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            categorie: "CIM BENIN",
            total_commande_traitee: results[0].commande_journaliere_traitee_CIMBENIN
          }, {
            categorie: "NOCIBE",
            total_commande_traitee: results[0].commande_journaliere_traitee_NOCIBE
          }]);
        });
      } else {
        var _query5 = "\n        SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN 1 ELSE 0 END),0)\n        AS commande_journaliere_traitee_CIMBENIN,\n        COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN 1 ELSE 0 END),0)\n        AS commande_journaliere_traitee_NOCIBE\n        FROM commandes\n        WHERE DATE(date_commande) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)\n        AND est_traitee = 1;\n      ";
        connection.query(_query5, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            categorie: "CIM BENIN",
            total_commande_non_traitee: results[0].commande_journaliere_traitee_CIMBENIN
          }, {
            categorie: "NOCIBE",
            total_commande_non_traitee: results[0].commande_journaliere_traitee_NOCIBE
          }]);
        });
      }
    }
  }, {
    key: "getDailyPaymentTotalPerBank",
    value: function getDailyPaymentTotalPerBank(isToday, callback) {
      if (isToday == 1) {
        var query = "\n        SELECT\n\n        COALESCE(SUM(CASE WHEN banque = 'BOA' THEN montant ELSE 0 END),0)\n        AS total_paiement_journalier_BOA,\n\n        COALESCE(SUM(CASE WHEN banque = 'UBA' THEN montant ELSE 0 END),0)\n        AS total_paiement_journalier_UBA,\n\n        COALESCE(SUM(CASE WHEN banque = 'Ecobank' THEN montant ELSE 0 END),0)\n        AS total_paiement_journalier_Ecobank,\n\n        COALESCE(SUM(CASE WHEN banque = 'NSIA' THEN montant ELSE 0 END),0)\n        AS total_paiement_journalier_NSIA,\n\n        COALESCE(SUM(CASE WHEN banque = 'SGB' THEN montant ELSE 0 END),0)\n        AS total_paiement_journalier_SGB,\n\n        COALESCE(SUM(CASE WHEN banque = 'BGFI' THEN montant ELSE 0 END),0)\n        AS total_paiement_journalier_BGFI\n\n        FROM paiement_client\n\n        WHERE DATE(date_paiement) = CURDATE() \n\n        AND est_valide = 1\n      ";
        connection.query(query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            banque: "BOA",
            total_paiement: results[0].total_paiement_journalier_BOA
          }, {
            banque: "UBA",
            total_paiement: results[0].total_paiement_journalier_UBA
          }, {
            banque: "Ecobank",
            total_paiement: results[0].total_paiement_journalier_Ecobank
          }, {
            banque: "NSIA",
            total_paiement: results[0].total_paiement_journalier_NSIA
          }, {
            banque: "SGB",
            total_paiement: results[0].total_paiement_journalier_SGB
          }, {
            banque: "BGFI",
            total_paiement: results[0].total_paiement_journalier_BGFI
          }]);
        });
      } else {
        var _query6 = "\n          SELECT\n  \n          COALESCE(SUM(CASE WHEN banque = 'BOA' THEN montant ELSE 0 END),0)\n          AS total_paiement_journalier_BOA,\n  \n          COALESCE(SUM(CASE WHEN banque = 'UBA' THEN montant ELSE 0 END),0)\n          AS total_paiement_journalier_UBA,\n  \n          COALESCE(SUM(CASE WHEN banque = 'Ecobank' THEN montant ELSE 0 END),0)\n          AS total_paiement_journalier_Ecobank,\n  \n          COALESCE(SUM(CASE WHEN banque = 'NSIA' THEN montant ELSE 0 END),0)\n          AS total_paiement_journalier_NSIA,\n  \n          COALESCE(SUM(CASE WHEN banque = 'SGB' THEN montant ELSE 0 END),0)\n          AS total_paiement_journalier_SGB,\n  \n          COALESCE(SUM(CASE WHEN banque = 'BGFI' THEN montant ELSE 0 END),0)\n          AS total_paiement_journalier_BGFI\n  \n          FROM paiement_client\n  \n          WHERE DATE(date_paiement) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) \n  \n          AND est_valide = 1\n        ";
        connection.query(_query6, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            banque: "BOA",
            total_paiement: results[0].total_paiement_journalier_BOA
          }, {
            banque: "UBA",
            total_paiement: results[0].total_paiement_journalier_UBA
          }, {
            banque: "Ecobank",
            total_paiement: results[0].total_paiement_journalier_Ecobank
          }, {
            banque: "NSIA",
            total_paiement: results[0].total_paiement_journalier_NSIA
          }, {
            banque: "SGB",
            total_paiement: results[0].total_paiement_journalier_SGB
          }, {
            banque: "BGFI",
            total_paiement: results[0].total_paiement_journalier_BGFI
          }]);
        });
      }
    }
  }, {
    key: "getDailyPurchasesOrdersStockTotal",
    value: function getDailyPurchasesOrdersStockTotal(isToday, callback) {
      if (isToday == 1) {
        var query = "\n        SELECT categorie, COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' AND date_rechargement <> CURDATE()\n                        THEN stock_apres_vente ELSE 0 END),0)\n        AS stock_bon_commande_restant_CIMBENIN,\n        COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' AND date_rechargement <> CURDATE()\n                    THEN stock_apres_vente ELSE 0 END),0)\n        AS stock_bon_commande_restant_NOCIBE\n        FROM stock_bon_commande\n        GROUP BY categorie\n      ";
        connection.query(query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            categorie: "CIM BENIN",
            total_stock_restant: results[0].categorie == "CIM BENIN" ? results[0].stock_bon_commande_restant_CIMBENIN : results[1].stock_bon_commande_restant_CIMBENIN
          }, {
            categorie: "NOCIBE",
            total_stock_restant: results[0].categorie == "NOCIBE" ? results[0].stock_bon_commande_restant_NOCIBE : results[1].stock_bon_commande_restant_NOCIBE
          }]);
        });
      } else {
        var _query7 = "\n      SELECT categories.category, \n      COALESCE(stock_bon_commande_restant.stock_bon_commande_restant_CIMBENIN + total_achats_today.total_achat_CIMBENIN,0)\n      AS stock_bon_commande_restant_CIMBENIN,\n      COALESCE(stock_bon_commande_restant.stock_bon_commande_restant_NOCIBE + total_achats_today.total_achat_NOCIBE,0) \n      AS stock_bon_commande_restant_NOCIBE\n      FROM categories\n      LEFT JOIN \n      (\n      SELECT categorie, COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' AND date_rechargement <> CURDATE()\n                          THEN stock_apres_vente ELSE 0 END),0)\n      AS stock_bon_commande_restant_CIMBENIN,\n      COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' AND date_rechargement <> CURDATE()\n                   THEN stock_apres_vente ELSE 0 END),0)\n      AS stock_bon_commande_restant_NOCIBE\n      FROM stock_bon_commande\n      GROUP BY categorie\n      ) AS stock_bon_commande_restant\n      \n      ON categories.category = stock_bon_commande_restant.categorie \n      \n      \n      -- on ajoute les achats effectues aujourd'hui \n      -- au stock bon de commande total pour avoir le stok bon commande restant hier\n      \n      LEFT JOIN\n      (\n      SELECT categories.category, \n      COALESCE(total_achat_today.total_achat_CIMBENIN,0) AS total_achat_CIMBENIN,\n      COALESCE(total_achat_today.total_achat_NOCIBE,0) AS total_achat_NOCIBE\n      FROM categories\n      LEFT JOIN \n      (\n          SELECT categorie,\n          COALESCE(SUM(CASE WHEN  achat_client.categorie = 'CIM BENIN' THEN achat_client.quantite_achetee ELSE 0 END),0) \n          AS total_achat_CIMBENIN,\n        COALESCE(SUM(CASE WHEN achat_client.categorie = 'NOCIBE' THEN achat_client.quantite_achetee ELSE 0 END),0) \n        AS total_achat_NOCIBE\n        FROM achat_client\n        WHERE DATE(date_achat) = CURDATE()\n        GROUP BY categorie\n      ) AS total_achat_today \n      ON categories.category = total_achat_today.categorie\n      \n      ) AS total_achats_today\n      \n      ON stock_bon_commande_restant.categorie = total_achats_today.category\n      ";
        connection.query(_query7, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          if (results.length == 0) {
            return callback(null, null);
          }

          return callback(null, [{
            categorie: "CIM BENIN",
            total_stock_restant: results[0].category == "CIM BENIN" ? results[0].stock_bon_commande_restant_CIMBENIN : results[1].stock_bon_commande_restant_CIMBENIN
          }, {
            categorie: "NOCIBE",
            total_stock_restant: results[0].category == "NOCIBE" ? results[0].stock_bon_commande_restant_NOCIBE : results[1].stock_bon_commande_restant_NOCIBE
          }]);
        });
      }
    }
  }, {
    key: "getDailyAdvancesDebts",
    value: function getDailyAdvancesDebts(isToday, callback) {
      if (isToday == 1) {
        //const today = new Date();
        var startDate = new Date(1960); //startDate.setHours(0, 0, 0, 0);

        var endDate = new Date(); //  endDate.setHours(23, 59, 59, 999);

        SoldeClient.getAll(startDate, endDate, function (soldesClientsError, soldesClients) {
          if (soldesClientsError) {
            return callback(soldesClientsError, null);
          }

          return callback(null, {
            total_avances: soldesClients.length == 0 ? 0 : soldesClients[0].total_avance_clients,
            total_creances: soldesClients.length == 0 ? 0 : soldesClients[0].total_creance_clients
          });
        });
      } else {
        var today = new Date();
        var yesterday = new Date().setDate(6);

        var _startDate = new Date(1960);

        var _endDate = new Date(yesterday);

        _endDate.setHours(23, 59, 59, 999);

        SoldeClient.getAll(_startDate, _endDate, function (soldesClientsError, soldesClients) {
          if (soldesClientsError) {
            return callback(soldesClientsError, null);
          }

          return callback(null, {
            total_avances: soldesClients.length == 0 ? 0 : soldesClients[0].total_avance_clients,
            total_creances: soldesClients.length == 0 ? 0 : soldesClients[0].total_creance_clients
          });
        });
      }
    }
  }]);

  return TableBord;
}();

module.exports = TableBord; // ====== Achat Entreprise Journaliere

/**
 SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END),0)
AS total_achat_entreprise_journaliere_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END),0)
AS total_achat_entreprise_journaliere_NOCIBE
FROM achat_entreprise
WHERE DATE(date_achat) = CURDATE();

 */
// ====== Statistique Vente Semaine

/**
 
 SELECT DISTINCT CASE 
    WHEN jours.days = 'Monday' THEN 'Lundi'
    WHEN jours.days = 'Tuesday' THEN 'Mardi'
    WHEN jours.days = 'Wednesday' THEN 'Mercredi'
    WHEN jours.days = 'Thursday' THEN 'Jeudi'
    WHEN jours.days = 'Friday' THEN 'Vendredi'
    WHEN jours.days = 'Saturday' THEN 'Samedi'
    WHEN jours.days = 'Sunday' THEN 'Dimanche'
  END AS jours, COALESCE(SUM(achat_client.montant),0) as total_achat, achat_client.date_achat from jours
LEFT JOIN achat_client
ON jours.days = DAYNAME(achat_client.date_achat)
AND WEEK(achat_client.date_achat) = WEEK(CURRENT_DATE)
GROUP by jours.days ORDER BY
  FIELD(jours,'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 
  'Samedi')

  */
// ======= Statistique de Paiement Semaine

/**

 SELECT DISTINCT CASE 
    WHEN jours.days = 'Monday' THEN 'Lundi'
    WHEN jours.days = 'Tuesday' THEN 'Mardi'
    WHEN jours.days = 'Wednesday' THEN 'Mercredi'
    WHEN jours.days = 'Thursday' THEN 'Jeudi'
    WHEN jours.days = 'Friday' THEN 'Vendredi'
    WHEN jours.days = 'Saturday' THEN 'Samedi'
    WHEN jours.days = 'Sunday' THEN 'Dimanche'
  END AS jours, COALESCE(SUM(paiement_client.montant),0) as total_paiement from jours
LEFT JOIN paiement_client
ON jours.days = DAYNAME(paiement_client.date_paiement)
AND WEEK(paiement_client.date_paiement) = WEEK(CURRENT_DATE) AND paiement_client.est_valide =1
GROUP by jours.days ORDER BY
  FIELD(jours,'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi')

 */
// ======== Total Vente Journee

/* 

 SELECT SUM(montant) AS total_vente_journaliere
FROM achat_client
WHERE DATE(date_achat) = CURDATE()

*/
// ========= Total Clients Inscrits Journalier

/*

SELECT COUNT(*) AS total_clients_inscris
FROM clients
WHERE DATE(date_ajout) = CURDATE()

*/
// ========== Total Paiement Journalier

/**
 
SELECT SUM(montant) AS total_paiement_journaliere
FROM paiement_client
WHERE DATE(date_paiement) = CURDATE()

 */
// ======== Paiement Journalier CIM BENIN && NOCIBE

/**
 *SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_NOCIBE
FROM paiement_client
WHERE DATE(date_paiement) = CURDATE() 
AND est_valide = 1
 */
// Vente Journaliere CIM BENIN && NOCIBE

/**

SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END),0)
AS total_vente_journaliere_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END),0)
AS total_vente_journaliere_NOCIBE
FROM achat_client
WHERE DATE(date_achat) = CURDATE();


 */
// Commandes Non traitees Journaliere

/**
 
 SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN 1 ELSE 0 END),0)
AS commande_journaliere_traitee_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN 1 ELSE 0 END),0)
AS commande_journaliere_traitee_NOCIBE
FROM commandes
WHERE DATE(date_commande) = CURDATE()
AND est_traitee = 0;

 
 */
// Commandes  Traitees Journaliere

/**
 
SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN 1 ELSE 0 END),0)
AS commande_journaliere_traitee_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN 1 ELSE 0 END),0)
AS commande_journaliere_traitee_NOCIBE
FROM commandes
WHERE DATE(date_commande) = CURDATE()
AND est_traitee = 1;

 
 */
// ====== Paiement Banque Journalier

/**
 
SELECT

COALESCE(SUM(montant),0)
AS total_paiement_journaliere,

COALESCE(SUM(CASE WHEN banque = 'BOA' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_BOA,

COALESCE(SUM(CASE WHEN banque = 'UBA' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_UBA,

COALESCE(SUM(CASE WHEN banque = 'Ecobank' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_Ecobank,

COALESCE(SUM(CASE WHEN banque = 'NSIA' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_NSIA,

COALESCE(SUM(CASE WHEN banque = 'SGB' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_SGB,

COALESCE(SUM(CASE WHEN banque = 'BGFI' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_BGFI

FROM paiement_client

WHERE DATE(date_paiement) = CURDATE() 

AND est_valide = 1


 */
//  ===== Stock Bon Commande Journalier

/**

SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' AND date_rechargement <> CURDATE()
                    THEN stock_apres_vente ELSE 0 END),0)
AS stock_bon_commande_journaliere_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' AND date_rechargement <> CURDATE()
             THEN stock_apres_vente ELSE 0 END),0)
AS stock_bon_commande_journaliere_NOCIBE
FROM stock_bon_commande

 */
// Total Achat Hier  -- pour determiner le stock bon de commande hier (avant vente  aujourd'hui)

/**
 * 
 * SELECT categories.category, 
COALESCE(total_achat_hier.total_achat_CIMBENIN) AS total_achat_CIMBENIN,
COALESCE(total_achat_hier.total_achat_NOCIBE) AS total_achat_NOCIBE
FROM categories
LEFT JOIN 
(
	SELECT categorie,
	COALESCE(SUM(CASE WHEN  achat_client.categorie = 'CIM BENIN' THEN achat_client.quantite_achetee ELSE 0 END),0) 
	AS total_achat_CIMBENIN,
  COALESCE(SUM(CASE WHEN achat_client.categorie = 'NOCIBE' THEN achat_client.quantite_achetee ELSE 0 END),0) 
  AS total_achat_NOCIBE
  FROM achat_client
  WHERE DATE(date_achat) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
  GROUP BY categorie
) AS total_achat_hier 
ON categories.category = total_achat_hier.categorie


-- SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY)

 */
// ====== DAYS TEST

/**
 * 
 * SELECT
    CASE 
        WHEN jours.days = 'Monday' THEN 'Lundi'
        WHEN jours.days = 'Tuesday' THEN 'Mardi'
        WHEN jours.days = 'Wednesday' THEN 'Mercredi'
        WHEN jours.days = 'Thursday' THEN 'Jeudi'
        WHEN jours.days = 'Friday' THEN 'Vendredi'
        WHEN jours.days = 'Saturday' THEN 'Samedi'
        WHEN jours.days = 'Sunday' THEN 'Dimanche'
    END AS jours,
    DATE_ADD(CURRENT_DATE, INTERVAL
        CASE 
            WHEN jours.days = 'Monday' THEN 0
            WHEN jours.days = 'Tuesday' THEN 1
            WHEN jours.days = 'Wednesday' THEN 2
            WHEN jours.days = 'Thursday' THEN 3
            WHEN jours.days = 'Friday' THEN 4
            WHEN jours.days = 'Saturday' THEN 5
            WHEN jours.days = 'Sunday' THEN 6
        END DAY) AS date_du_jour,
    COALESCE(SUM(paiement_client.montant), 0) AS total_paiement
FROM jours
LEFT JOIN paiement_client
    ON jours.days = DAYNAME(paiement_client.date_paiement)
    AND WEEK(paiement_client.date_paiement) = WEEK(CURRENT_DATE)
    AND paiement_client.est_valide = 1
GROUP BY jours.days
ORDER BY FIELD(jours, 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche')

 */
// ============ DAYS

/**
 * 
SELECT
    'Lundi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 0 DAY) AS date
UNION
SELECT
    'Mardi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY) AS date
UNION
SELECT
    'Mercredi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 2 DAY) AS date
UNION
SELECT
    'Jeudi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY) AS date
UNION
SELECT
    'Vendredi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 4 DAY) AS date
UNION
SELECT
    'Samedi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY) AS date
UNION
SELECT
    'Dimanche' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 6 DAY) AS date;

 */