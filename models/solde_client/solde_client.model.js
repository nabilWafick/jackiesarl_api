const connection = require("../_db/database");
const Clients = require("../clients/clients.model");

/*
total_dettes_mois = `SELECT achat_client.id_client, SUM(achat_client.montant) AS total_dettes_mois FROM  achat_client WHERE id_client = 221 AND date_achat BETWEEN '2023-10-01' AND '2023-10-22' GROUP BY achat_client.id_client;`;

total_paiements_mois = `SELECT paiement_client.id_client, SUM(paiement_client.montant) AS total_paiements_mois FROM  paiement_client WHERE id_client = 221 AND est_valide = 1 AND date_paiement BETWEEN '2023-10-01' AND '2023-10-23'  GROUP BY paiement_client.id_client;`;

total_dettes_gobal = `SELECT achat_client.id_client, SUM(achat_client.montant) AS total_dettes_global FROM  achat_client WHERE id_client = 221 GROUP BY achat_client.id_client;`;

total_paiements_global = `SELECT paiement_client.id_client, SUM(paiement_client.montant) AS total_paiements_global FROM  paiement_client WHERE id_client = 221 AND est_valide = 1 GROUP BY paiement_client.id_client;`;

*/

class SoldeClient {
  constructor(total_dettes, total_paiements, creance, avance) {
    (this.total_dettes = total_dettes),
      (this.total_paiements = total_paiements),
      (this.creance = creance),
      (this.avance = avance);
  }

  static getByIdClient(id_client, callback) {
    // obtenir le total des dettes du mois
    const firstMonthDayDate = new Date();
    firstMonthDayDate.setDate(1), firstMonthDayDate.setHours(0, 0, 0);
    //  console.log("firstMonthDayDate", firstMonthDayDate.toLocaleString());

    const query_total_dettes_mois = `SELECT achat_client.id_client, SUM(achat_client.montant) AS total_dettes_mois FROM  achat_client WHERE id_client = ? AND date_achat BETWEEN ? AND ? GROUP BY achat_client.id_client;`;
    connection.query(
      query_total_dettes_mois,
      [id_client, firstMonthDayDate, new Date()],
      (error_total_dettes_mois, results) => {
        let total_dettes_mois = 0;
        let total_paiements_mois = 0;
        let total_dettes_global = 0;
        let total_paiements_global = 0;

        if (error_total_dettes_mois) {
          return callback(error_total_dettes_mois, null);
        }
        if (results.length === 0) {
          total_dettes_mois = 0; // le client n'a pas acheté ce mois
        }
        total_dettes_mois = results[0].total_dettes_mois; // on obtient la dette de ce mois

        // obtenir le total des paiements de ce mois

        const query_total_paiements_mois = `SELECT paiement_client.id_client, SUM(paiement_client.montant) AS total_paiements_mois FROM  paiement_client WHERE id_client = ? AND est_valide = 1 AND date_paiement BETWEEN ? AND ?  GROUP BY paiement_client.id_client;`;

        connection.query(
          query_total_paiements_mois,
          [id_client, firstMonthDayDate, new Date()],
          (error_total_paiements_mois, results) => {
            if (error_total_paiements_mois) {
              return callback(error_total_paiements_mois, null);
            }
            if (results.length === 0) {
              total_paiements_mois = 0; // le client n'a pas payé ce mois
            }
            total_paiements_mois = results[0].total_paiements_mois; // on obtient le payement de ce mois

            // obtenir le total des dettes
            const query_total_dettes_global = `SELECT achat_client.id_client, SUM(achat_client.montant) AS total_dettes_global FROM  achat_client WHERE id_client = ? GROUP BY achat_client.id_client;`;

            connection.query(
              query_total_dettes_global,
              [id_client],
              (error_total_dettes_global, results) => {
                if (error_total_dettes_global) {
                  return callback(error_total_dettes_global, null);
                }
                if (results.length === 0) {
                  total_dettes_global = 0; // le client n'a jamais acheté
                }
                total_dettes_global = results[0].total_dettes_global; // on obtient le total des dettes

                // obtenir le total des paiements

                const query_total_paiements_global = `SELECT paiement_client.id_client, SUM(paiement_client.montant) AS total_paiements_global FROM  paiement_client WHERE id_client = ? AND est_valide = 1 GROUP BY paiement_client.id_client;`;

                connection.query(
                  query_total_paiements_global,
                  [id_client],
                  (error_total_paiements_global, results) => {
                    if (error_total_paiements_global) {
                      return callback(error_total_paiements_global, null);
                    }
                    if (results.length === 0) {
                      total_paiements_global = 0; // le client n'a jamais payé
                    }
                    total_paiements_global = results[0].total_paiements_global; // on obtient le total des paiement

                    // on détermine s'il s'agit d'une créance ou d'une avance

                    if (total_dettes_global - total_paiements_global > 0) {
                      const soldeClient = new SoldeClient(
                        total_dettes_mois,
                        total_paiements_mois,
                        total_dettes_global - total_paiements_global,
                        0
                      );
                      return callback(null, soldeClient);
                    } else {
                      const soldeClient = new SoldeClient(
                        total_dettes_mois,
                        total_paiements_mois,
                        0,
                        total_paiements_global - total_dettes_global
                      );
                      return callback(null, soldeClient);
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  }
}

module.exports = SoldeClient;
