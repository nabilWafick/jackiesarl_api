const connection = require("../_db/database");
const Clients = require("../clients/clients.model");
class PaiementClient {
  constructor(
    id,
    client,
    montant,
    banque,
    reference,
    categorie,
    numero_bc,
    bordereau,
    est_valide,
    id_client,
    date_paiement
  ) {
    this.id = id;
    this.client = client;
    this.montant = montant;
    this.banque = banque;
    this.reference = reference;
    this.categorie = categorie;
    this.numero_bc = numero_bc;
    this.bordereau = bordereau;
    this.est_valide = est_valide;
    this.id_client = id_client;
    this.date_paiement = date_paiement;
  }

  static create(paiementData, callback) {
    const query =
      "INSERT INTO paiement_client (id, montant, banque, reference, categorie, numero_bc, bordereau, est_valide, id_client, date_paiement) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        paiementData.montant,
        paiementData.banque,
        paiementData.reference,
        paiementData.categorie,
        paiementData.numero_bc,
        paiementData.bordereau,
        paiementData.est_valide,
        paiementData.id_client,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newPaiement = new PaiementClient(
          results.insertId,
          undefined,
          ...Object.values(paiementData),
          currentDate
        );
        return callback(null, newPaiement);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM paiement_client WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Paiement client non trouvé
      }
      const paiementData = results[0];
      const paiement = new PaiementClient(
        paiementData.id,
        undefined,
        paiementData.montant,
        paiementData.banque,
        paiementData.reference,
        paiementData.categorie,
        paiementData.numero_bc,
        paiementData.bordereau,
        paiementData.est_valide,
        paiementData.id_client,
        paiementData.date_paiement
      );
      return callback(null, paiement);
    });
  }

  static getAll(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.id DESC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.id DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllFromNewToOld(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.id DESC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.id DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllFromOldToNew(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.id ASC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.id ASC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllMostImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.montant DESC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.montant DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllLessImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.montant ASC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client
      ORDER BY paiement_client.montant ASC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllNOCIBEMostImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client AND
      paiement_client.categorie = 'NOCIBE' AND
      ORDER BY paiement_client.montant DESC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client AND
      paiement_client.categorie = 'NOCIBE' AND
      ORDER BY paiement_client.montant DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllNOCIBELessImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client AND
      paiement_client.categorie = 'NOCIBE' AND
      ORDER BY paiement_client.montant ASC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client AND
      paiement_client.categorie = 'NOCIBE' AND
      ORDER BY paiement_client.montant ASC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllCIMBENINMostImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client AND
      paiement_client.categorie = 'CIM BENIN' AND
      ORDER BY paiement_client.montant DESC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client AND
      paiement_client.categorie = 'CIM BENIN' AND
      ORDER BY paiement_client.montant DESC`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllCIMBENINLessImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client AND
      paiement_client.categorie = 'CIM BENIN' AND
      ORDER BY paiement_client.montant ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client AND
      paiement_client.categorie = 'CIM BENIN' AND
      ORDER BY paiement_client.montant ASC`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllValidated(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client AND
      paiement_client.est_valide = 1 
      ORDER BY paiement_client.id DESC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client AND
      paiement_client.est_valide = 1 
      ORDER BY paiement_client.id DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllUnValidated(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
      clients.id AS id_client,
      clients.nom,
      clients.prenoms,
      clients.numero_ifu,
      clients.numero_telephone,
      clients.email,
      clients.date_ajout AS date_ajout_client,
      paiement_client.id AS id,
      paiement_client.montant AS montant,
      paiement_client.banque,
      paiement_client.reference,
      paiement_client.categorie,
      paiement_client.numero_bc,
      paiement_client.bordereau,
      paiement_client.est_valide,
      paiement_client.id_client AS id_client,
      paiement_client.date_paiement
      FROM
      clients, paiement_client
      WHERE
      paiement_client.date_paiement BETWEEN ? AND ? AND
      clients.id = paiement_client.id_client AND
      paiement_client.est_valide = 0
      ORDER BY paiement_client.id DESC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            return new PaiementClient(
              paiementData.id,
              new Clients(
                paiementData.id_client,
                paiementData.nom,
                paiementData.prenoms,
                paiementData.numero_ifu,
                paiementData.numero_telephone,
                paiementData.email,
                paiementData.date_ajout
              ),
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    paiement_client.id AS id,
    paiement_client.montant AS montant,
    paiement_client.banque,
    paiement_client.reference,
    paiement_client.categorie,
    paiement_client.numero_bc,
    paiement_client.bordereau,
    paiement_client.est_valide,
    paiement_client.id_client AS id_client,
    paiement_client.date_paiement
    FROM
      clients, paiement_client
      WHERE
      clients.id = paiement_client.id_client AND
      paiement_client.est_valide = 0
      ORDER BY paiement_client.id DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          return new PaiementClient(
            paiementData.id,
            new Clients(
              paiementData.id_client,
              paiementData.nom,
              paiementData.prenoms,
              paiementData.numero_ifu,
              paiementData.numero_telephone,
              paiementData.email,
              paiementData.date_ajout
            ),
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  // Selected Client

  static getAllOfClient(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientFromNewToOld(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientFromOldToNew(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY id ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY id ASC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientMostImportant(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY montant DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY montant DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientLessImportant(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY montant ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY montant ASC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientCIMBENINMostImportant(
    startDate,
    endDate,
    id_client,
    callback
  ) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND categorie = 'CIM BENIN' ORDER BY montant DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? AND categorie = 'CIM BENIN' ORDER BY montant DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientCIMBENINLessImportant(
    startDate,
    endDate,
    id_client,
    callback
  ) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND categorie = 'CIM BENIN' ORDER BY montant ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? AND categorie = 'CIM BENIN' ORDER BY montant ASC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientNOCIBEMostImportant(
    startDate,
    endDate,
    id_client,
    callback
  ) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND categorie = 'NOCIBE' ORDER BY montant DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? AND categorie = 'NOCIBE' ORDER BY montant DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientNOCIBELessImportant(
    startDate,
    endDate,
    id_client,
    callback
  ) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND categorie = 'NOCIBE' ORDER BY montant ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? AND categorie = 'NOCIBE' ORDER BY montant ASC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientUnvalidated(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND est_valide = 0 ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? AND est_valide = 0 ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  static getAllOfClientValidated(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND est_valide = 1 ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const paiementsList = results.map((paiementData) => {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(
              paiementData.id,
              undefined,
              paiementData.montant,
              paiementData.banque,
              paiementData.reference,
              paiementData.categorie,
              paiementData.numero_bc,
              paiementData.bordereau,
              paiementData.est_valide,
              paiementData.id_client,
              paiementData.date_paiement
            );
          });
          return callback(null, paiementsList);
        }
      );
    } else {
      const query =
        "SELECT * FROM paiement_client WHERE id_client = ? AND est_valide = 1 ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const paiementsList = results.map((paiementData) => {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(
            paiementData.id,
            undefined,
            paiementData.montant,
            paiementData.banque,
            paiementData.reference,
            paiementData.categorie,
            paiementData.numero_bc,
            paiementData.bordereau,
            paiementData.est_valide,
            paiementData.id_client,
            paiementData.date_paiement
          );
        });
        return callback(null, paiementsList);
      });
    }
  }

  update(callback) {
    const query =
      "UPDATE paiement_client SET montant = ?, banque = ?, reference = ?, categorie = ?, numero_bc = ?, bordereau = ?, est_valide = ?, id_client = ?, date_paiement = ? WHERE id = ?";
    const { id, ...updatedData } = this;
    connection.query(
      query,
      [
        updatedData.montant,
        updatedData.banque,
        updatedData.reference,
        updatedData.categorie,
        updatedData.numero_bc,
        updatedData.bordereau,
        updatedData.est_valide,
        updatedData.id_client,
        updatedData.date_paiement,
        id,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null);
      }
    );
  }

  delete(callback) {
    const query = "DELETE FROM paiement_client WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = PaiementClient;
