const connection = require("../_db/database");
const Clients = require("../clients/clients.model");

class SoldeClient {
  constructor(
    client,
    total_dettes_mois,
    total_paiements_mois,
    total_dettes_global,
    total_paiements_global,
    avance,
    creance,
    total_dettes_mois_CIMBENIN,
    total_dettes_mois_NOCIBE,
    total_paiements_mois_CIMBENIN,
    total_paiements_mois_NOCIBE,
    total_dettes_global_CIMBENIN,
    total_dettes_global_NOCIBE,
    total_paiements_global_CIMBENIN,
    total_paiements_global_NOCIBE,
    avance_CIMBENIN,
    avance_NOCIBE,
    creance_CIMBENIN,
    creance_NOCIBE,
    total_avance_CIMBENIN,
    total_avance_NOCIBE,
    total_creance_CIMBENIN,
    total_creance_NOCIBE,
    total_avance_clients,
    total_creance_clients,
    pourcentage_avance_client,
    pourcentage_creance_client
  ) {
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
    (this.total_avance_CIMBENIN = total_avance_CIMBENIN),
      (this.total_avance_NOCIBE = total_avance_NOCIBE),
      (this.total_creance_CIMBENIN = total_creance_CIMBENIN),
      (this.total_creance_NOCIBE = total_creance_NOCIBE),
      (this.total_creance_clients = total_creance_clients);
    this.total_avance_clients = total_avance_clients;
    this.pourcentage_avance_client = pourcentage_avance_client;
    this.pourcentage_creance_client = pourcentage_creance_client;
  }

  static getByIdClient(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const queryClientBalence = `SELECT
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
`;
      // WHERE clients.id = ?
      connection.query(
        queryClientBalence,
        [
          /*1 */ startDate,
          /* 2*/ endDate,
          /* 3*/ startDate,
          /*4 */ endDate,
          /* 5*/ endDate,
          /* 6*/ endDate,
          /* 7*/ startDate,
          /* 8*/ endDate,
          /* 9*/ startDate,
          /* 10*/ endDate,
          /*11 */ endDate,
          /*12 */ endDate,
          /* 13*/ startDate,
          /*14 */ endDate,
          /*15 */ startDate,
          /* 16*/ endDate,
          /* 17*/ endDate,
          /*18 */ endDate,
        ],

        (errorClientBalence, results) => {
          if (errorClientBalence) {
            return callback(errorClientBalence, null);
          }
          if (results.length === 0) {
            return callback(null, null);
          }
          let sumAvance = 0;
          let sumAvanceCIMBENIN = 0;
          let sumAvanceNOCIBE = 0;
          let sumCreance = 0;
          let sumCreanceCIMBENIN = 0;
          let sumCreanceNOCIBE = 0;
          let percentage_avance_client = 0;
          let percentage_creance_client = 0;

          results.forEach((solde) => {
            sumAvance += solde.avance;
            sumAvanceCIMBENIN += solde.avance_CIMBENIN;
            sumAvanceNOCIBE += solde.avance_NOCIBE;
            sumCreance += solde.creance;
            sumCreanceCIMBENIN += solde.creance_CIMBENIN;
            sumCreanceNOCIBE += solde.creance_NOCIBE;
          });

          const soldeData = results.find((solde) => solde.id == id_client);
          console.log("soldeData", soldeData);
          percentage_avance_client = parseFloat(
            ((soldeData.avance * 100) / sumAvance).toFixed(3)
          );
          percentage_creance_client = parseFloat(
            ((soldeData.creance * 100) / sumCreance).toFixed(3)
          );

          const soldeClient = new SoldeClient(
            new Clients(
              soldeData.id,
              soldeData.nom,
              soldeData.prenoms,
              soldeData.numero_ifu,
              soldeData.numero_telephone,
              soldeData.email,
              soldeData.date_ajout
            ),
            soldeData.total_dettes_mois,
            soldeData.total_paiements_mois,
            soldeData.total_dettes_global,
            soldeData.total_paiements_global,
            soldeData.avance,
            soldeData.creance,
            soldeData.total_dettes_mois_CIMBENIN,
            soldeData.total_dettes_mois_NOCIBE,
            soldeData.total_paiements_mois_CIMBENIN,
            soldeData.total_paiements_mois_NOCIBE,
            soldeData.total_dettes_global_CIMBENIN,
            soldeData.total_dettes_global_NOCIBE,
            soldeData.total_paiements_global_CIMBENIN,
            soldeData.total_paiements_global_NOCIBE,
            soldeData.avance_CIMBENIN,
            soldeData.avance_NOCIBE,
            soldeData.creance_CIMBENIN,
            soldeData.creance_NOCIBE,
            sumAvanceCIMBENIN,
            sumAvanceNOCIBE,
            sumCreanceCIMBENIN,
            sumCreanceNOCIBE,
            sumAvance,
            sumCreance,
            percentage_avance_client,
            percentage_creance_client
          );

          return callback(null, soldeClient);
        }
      );
    } else {
      const queryClientBalence = `SELECT
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
  ON clients.id = paiement_global_nocibe.id_client;`;

      // WHERE clients.id = ?
      connection.query(
        queryClientBalence,
        [new Date(startDate), new Date(endDate)],
        (errorClientBalence, results) => {
          if (errorClientBalence) {
            return callback(errorClientBalence, null);
          }
          if (results.length === 0) {
            return callback(null, null);
          }
          let sumAvance = 0;
          let sumAvanceCIMBENIN = 0;
          let sumAvanceNOCIBE = 0;
          let sumCreance = 0;
          let sumCreanceCIMBENIN = 0;
          let sumCreanceNOCIBE = 0;
          let percentage_avance_client = 0;
          let percentage_creance_client = 0;

          results.forEach((solde) => {
            sumAvance += solde.avance;
            sumAvanceCIMBENIN += solde.avance_CIMBENIN;
            sumAvanceNOCIBE += solde.avance_NOCIBE;
            sumCreance += solde.creance;
            sumCreanceCIMBENIN += solde.creance_CIMBENIN;
            sumCreanceNOCIBE += solde.creance_NOCIBE;
          });

          const soldeData = results.find((solde) => solde.id == id_client);
          console.log("soldeData", soldeData);
          percentage_avance_client = parseFloat(
            ((soldeData.avance * 100) / sumAvance).toFixed(3)
          );
          percentage_creance_client = parseFloat(
            ((soldeData.creance * 100) / sumCreance).toFixed(3)
          );

          const soldeClient = new SoldeClient(
            new Clients(
              soldeData.id,
              soldeData.nom,
              soldeData.prenoms,
              soldeData.numero_ifu,
              soldeData.numero_telephone,
              soldeData.email,
              soldeData.date_ajout
            ),
            soldeData.total_dettes_mois,
            soldeData.total_paiements_mois,
            soldeData.total_dettes_global,
            soldeData.total_paiements_global,
            soldeData.avance,
            soldeData.creance,
            soldeData.total_dettes_mois_CIMBENIN,
            soldeData.total_dettes_mois_NOCIBE,
            soldeData.total_paiements_mois_CIMBENIN,
            soldeData.total_paiements_mois_NOCIBE,
            soldeData.total_dettes_global_CIMBENIN,
            soldeData.total_dettes_global_NOCIBE,
            soldeData.total_paiements_global_CIMBENIN,
            soldeData.total_paiements_global_NOCIBE,
            soldeData.avance_CIMBENIN,
            soldeData.avance_NOCIBE,
            soldeData.creance_CIMBENIN,
            soldeData.creance_NOCIBE,
            sumAvanceCIMBENIN,
            sumAvanceNOCIBE,
            sumCreanceCIMBENIN,
            sumCreanceNOCIBE,
            sumAvance,
            sumCreance,
            percentage_avance_client,
            percentage_creance_client
          );

          return callback(null, soldeClient);
        }
      );
    }
  }

  static getAll(startDate, endDate, callback) {
    if ((startDate, endDate)) {
      const queryClientBalence = `SELECT
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
`;

      connection.query(
        queryClientBalence,
        [
          /*1 */ startDate,
          /* 2*/ endDate,
          /* 3*/ startDate,
          /*4 */ endDate,
          /* 5*/ endDate,
          /* 6*/ endDate,
          /* 7*/ startDate,
          /* 8*/ endDate,
          /* 9*/ startDate,
          /* 10*/ endDate,
          /*11 */ endDate,
          /*12 */ endDate,
          /* 13*/ startDate,
          /*14 */ endDate,
          /*15 */ startDate,
          /* 16*/ endDate,
          /* 17*/ endDate,
          /*18 */ endDate,
        ],

        (errorClientBalence, results) => {
          if (errorClientBalence) {
            return callback(errorClientBalence, null);
          }

          let sumAvance = 0;
          let sumAvanceCIMBENIN = 0;
          let sumAvanceNOCIBE = 0;
          let sumCreance = 0;
          let sumCreanceCIMBENIN = 0;
          let sumCreanceNOCIBE = 0;
          let percentage_avance_client = 0;
          let percentage_creance_client = 0;

          results.forEach((solde) => {
            sumAvance += solde.avance;
            sumAvanceCIMBENIN += solde.avance_CIMBENIN;
            sumAvanceNOCIBE += solde.avance_NOCIBE;
            sumCreance += solde.creance;
            sumCreanceCIMBENIN += solde.creance_CIMBENIN;
            sumCreanceNOCIBE += solde.creance_NOCIBE;
          });

          const soldeList = results.map((soldeData) => {
            percentage_avance_client = parseFloat(
              ((soldeData.avance * 100) / sumAvance).toFixed(3)
            );
            percentage_creance_client = parseFloat(
              ((soldeData.creance * 100) / sumCreance).toFixed(3)
            );

            return new SoldeClient(
              new Clients(
                soldeData.id,
                soldeData.nom,
                soldeData.prenoms,
                soldeData.numero_ifu,
                soldeData.numero_telephone,
                soldeData.email,
                soldeData.date_ajout
              ),
              soldeData.total_dettes_mois,
              soldeData.total_paiements_mois,
              soldeData.total_dettes_global,
              soldeData.total_paiements_global,
              soldeData.avance,
              soldeData.creance,
              soldeData.total_dettes_mois_CIMBENIN,
              soldeData.total_dettes_mois_NOCIBE,
              soldeData.total_paiements_mois_CIMBENIN,
              soldeData.total_paiements_mois_NOCIBE,
              soldeData.total_dettes_global_CIMBENIN,
              soldeData.total_dettes_global_NOCIBE,
              soldeData.total_paiements_global_CIMBENIN,
              soldeData.total_paiements_global_NOCIBE,
              soldeData.avance_CIMBENIN,
              soldeData.avance_NOCIBE,
              soldeData.creance_CIMBENIN,
              soldeData.creance_NOCIBE,
              sumAvanceCIMBENIN,
              sumAvanceNOCIBE,
              sumCreanceCIMBENIN,
              sumCreanceNOCIBE,
              sumAvance,
              sumCreance,
              percentage_avance_client,
              percentage_creance_client
            );
          });

          return callback(null, soldeList);
        }
      );
    } else {
      const queryClientBalence = `SELECT
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
  ON clients.id = paiement_global_nocibe.id_client;`;

      connection.query(
        queryClientBalence,

        (errorClientBalence, results) => {
          if (errorClientBalence) {
            return callback(errorClientBalence, null);
          }

          let sumAvance = 0;
          let sumAvanceCIMBENIN = 0;
          let sumAvanceNOCIBE = 0;
          let sumCreance = 0;
          let sumCreanceCIMBENIN = 0;
          let sumCreanceNOCIBE = 0;
          let percentage_avance_client = 0;
          let percentage_creance_client = 0;

          results.forEach((solde) => {
            sumAvance += solde.avance;
            sumAvanceCIMBENIN += solde.avance_CIMBENIN;
            sumAvanceNOCIBE += solde.avance_NOCIBE;
            sumCreance += solde.creance;
            sumCreanceCIMBENIN += solde.creance_CIMBENIN;
            sumCreanceNOCIBE += solde.creance_NOCIBE;
          });

          const soldeList = results.map((soldeData) => {
            percentage_avance_client = parseFloat(
              ((soldeData.avance * 100) / sumAvance).toFixed(3)
            );
            percentage_creance_client = parseFloat(
              ((soldeData.creance * 100) / sumCreance).toFixed(3)
            );

            return new SoldeClient(
              new Clients(
                soldeData.id,
                soldeData.nom,
                soldeData.prenoms,
                soldeData.numero_ifu,
                soldeData.numero_telephone,
                soldeData.email,
                soldeData.date_ajout
              ),
              soldeData.total_dettes_mois,
              soldeData.total_paiements_mois,
              soldeData.total_dettes_global,
              soldeData.total_paiements_global,
              soldeData.avance,
              soldeData.creance,
              soldeData.total_dettes_mois_CIMBENIN,
              soldeData.total_dettes_mois_NOCIBE,
              soldeData.total_paiements_mois_CIMBENIN,
              soldeData.total_paiements_mois_NOCIBE,
              soldeData.total_dettes_global_CIMBENIN,
              soldeData.total_dettes_global_NOCIBE,
              soldeData.total_paiements_global_CIMBENIN,
              soldeData.total_paiements_global_NOCIBE,
              soldeData.avance_CIMBENIN,
              soldeData.avance_NOCIBE,
              soldeData.creance_CIMBENIN,
              soldeData.creance_NOCIBE,
              sumAvanceCIMBENIN,
              sumAvanceNOCIBE,
              sumCreanceCIMBENIN,
              sumCreanceNOCIBE,
              sumAvance,
              sumCreance,
              percentage_avance_client,
              percentage_creance_client
            );
          });

          return callback(null, soldeList);
        }
      );
    }
  }
}

module.exports = SoldeClient;

// Prepared Request

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
