const connection = require("../_db/database");
const Clients = require("../clients/clients.model");

class AchatClient {
  constructor(
    id,
    client,
    quantite_achetee,
    categorie,
    montant,
    numero_ctp,
    bordereau,
    numero_bc,
    id_client,
    date_achat
  ) {
    this.id = id;
    this.client = client;
    this.quantite_achetee = quantite_achetee;
    this.categorie = categorie;
    this.montant = montant;
    this.numero_ctp = numero_ctp;
    this.bordereau = bordereau;
    this.numero_bc = numero_bc;
    this.id_client = id_client;
    this.date_achat = date_achat;
  }

  static create(achatClientData, callback) {
    const query =
      "INSERT INTO achat_client (id, quantite_achetee, categorie, montant, numero_ctp, bordereau, numero_bc, id_client, date_achat) VALUES (NULL,?,?,?,?,?,?,?,?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        achatClientData.quantite_achetee,
        achatClientData.categorie,
        achatClientData.montant,
        achatClientData.numero_ctp,
        achatClientData.bordereau,
        achatClientData.numero_bc,
        achatClientData.id_client,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newAchatClient = new AchatClient(
          results.insertId,
          ...Object.values(achatClientData),
          currentDate
        );
        return callback(null, newAchatClient);
      }
    );
  }

  static getById(id, callback) {
    const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
    FROM clients, achat_client
    WHERE  achat_client.id = ?`;
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Achat client non trouvé
      }
      const achatClientData = results[0];
      const achatClient = new AchatClient(
        achatClientData.achat_id,
        new Clients(
          achatClientData.client_id,
          achatClientData.nom,
          achatClientData.prenoms,
          achatClientData.numero_ifu,
          achatClientData.numero_telephone,
          achatClientData.email,
          achatClientData.date_ajout
        ),
        achatClientData.quantite_achetee,
        achatClientData.categorie,
        achatClientData.montant,
        achatClientData.numero_ctp,
        achatClientData.bordereau,
        achatClientData.numero_bc,
        achatClientData.client_id,
        new Date(achatClientData.date_achat)
      );
      return callback(null, achatClient);
    });
  }

  static getLastAchatStockBonCommande(numero_bc, callback) {
    const query =
      "SELECT * FROM achat_client WHERE numero_bc = ?  ORDER BY date_achat DESC LIMIT 1";
    connection.query(query, [numero_bc], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Achat client non trouvé
      }
      const achatClientData = results[0];
      const achatClient = new AchatClient(
        achatClientData.id,
        undefined,
        achatClientData.quantite_achetee,
        achatClientData.categorie,
        achatClientData.montant,
        achatClientData.numero_ctp,
        achatClientData.bordereau,
        achatClientData.numero_bc,
        achatClientData.id_client,
        new Date(achatClientData.date_achat)
      );
      return callback(null, achatClient);
    });
  }
  // ================ All Clients Purchases Without Bill ================

  static getAllWithoutBill(callback) {
    const query = `SELECT
      clients.id AS client_id,
      clients.nom AS nom,
      clients.prenoms AS prenoms,
      clients.numero_ifu AS numero_ifu,
      clients.numero_telephone AS numero_telephone,
      clients.email AS email,
      clients.date_ajout AS date_ajout,
      achat_client.id AS achat_id,
      achat_client.quantite_achetee,
      achat_client.categorie AS categorie,
      achat_client.montant AS montant,
      achat_client.numero_ctp AS numero_ctp,
      achat_client.bordereau AS bordereau,
      achat_client.numero_bc AS numero_bc,
      achat_client.date_achat AS date_achat
  FROM
      clients, achat_client 
  WHERE
       clients.id = achat_client.id_client  AND NOT EXISTS 
  (
   SELECT 1 
   FROM factures_mecef
   WHERE achat_client.id = factures_mecef.id_achat
  )
  
  ORDER BY achat_client.id DESC;`;
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const achatsClients = results.map((achatClientData) => {
        return new AchatClient(
          achatClientData.achat_id,
          new Clients(
            achatClientData.client_id,
            achatClientData.nom,
            achatClientData.prenoms,
            achatClientData.numero_ifu,
            achatClientData.numero_telephone,
            achatClientData.email,
            achatClientData.date_ajout
          ),
          achatClientData.quantite_achetee,
          achatClientData.categorie,
          achatClientData.montant,
          achatClientData.numero_ctp,
          achatClientData.bordereau,
          achatClientData.numero_bc,
          achatClientData.id_client,
          new Date(achatClientData.date_achat)
        );
      });
      return callback(null, achatsClients);
    });
  }

  // ================ All Clients Purchases ================

  static getAll(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
    FROM clients, achat_client
    WHERE achat_client.date_achat BETWEEN ? AND ? AND
    clients.id = achat_client.id_client
    ORDER BY achat_client.id DESC ;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
     clients.id = achat_client.id_client ORDER BY achat_client.id DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          return new AchatClient(
            achatClientData.achat_id,
            new Clients(
              achatClientData.client_id,
              achatClientData.nom,
              achatClientData.prenoms,
              achatClientData.numero_ifu,
              achatClientData.numero_telephone,
              achatClientData.email,
              achatClientData.date_ajout
            ),
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.id_client,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllFromNewToOld(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
achat_client.date_achat BETWEEN ? AND ? AND
     clients.id = achat_client.id_client ORDER BY achat_client.id DESC ;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
     clients.id = achat_client.id_client ORDER BY achat_client.id DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          return new AchatClient(
            achatClientData.achat_id,
            new Clients(
              achatClientData.client_id,
              achatClientData.nom,
              achatClientData.prenoms,
              achatClientData.numero_ifu,
              achatClientData.numero_telephone,
              achatClientData.email,
              achatClientData.date_ajout
            ),
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.id_client,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllFromOldToNew(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
achat_client.date_achat BETWEEN ? AND ? AND
     clients.id = achat_client.id_client ORDER BY achat_client.id ASC ;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
     clients.id = achat_client.id_client ORDER BY achat_client.id ASC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          return new AchatClient(
            achatClientData.achat_id,
            new Clients(
              achatClientData.client_id,
              achatClientData.nom,
              achatClientData.prenoms,
              achatClientData.numero_ifu,
              achatClientData.numero_telephone,
              achatClientData.email,
              achatClientData.date_ajout
            ),
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.id_client,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllMostImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
achat_client.date_achat BETWEEN ? AND ? AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC ;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          return new AchatClient(
            achatClientData.achat_id,
            new Clients(
              achatClientData.client_id,
              achatClientData.nom,
              achatClientData.prenoms,
              achatClientData.numero_ifu,
              achatClientData.numero_telephone,
              achatClientData.email,
              achatClientData.date_ajout
            ),
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.id_client,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllLessImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
achat_client.date_achat BETWEEN ? AND ? AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC ;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC;`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          return new AchatClient(
            achatClientData.achat_id,
            new Clients(
              achatClientData.client_id,
              achatClientData.nom,
              achatClientData.prenoms,
              achatClientData.numero_ifu,
              achatClientData.numero_telephone,
              achatClientData.email,
              achatClientData.date_ajout
            ),
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.id_client,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllNOCIBEMostImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE achat_client.categorie = 'NOCIBE' AND
achat_client.date_achat BETWEEN ? AND ? AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC;`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client
WHERE achat_client.categorie = 'NOCIBE' AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    }
  }

  static getAllNOCIBELessImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE achat_client.categorie = 'NOCIBE' AND
achat_client.date_achat BETWEEN ? AND ? AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE achat_client.categorie = 'NOCIBE' AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    }
  }

  static getAllCIMBENINMostImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE achat_client.categorie = 'CIM BENIN' AND
achat_client.date_achat BETWEEN ? AND ? AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE achat_client.categorie = 'CIM BENIN' AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    }
  }

  static getAllCIMBENINLessImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE achat_client.categorie = 'CIM BENIN' AND
achat_client.date_achat BETWEEN ? AND ? AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat
FROM
    clients
, achat_client 
WHERE achat_client.categorie = 'CIM BENIN' AND
     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            return new AchatClient(
              achatClientData.achat_id,
              new Clients(
                achatClientData.client_id,
                achatClientData.nom,
                achatClientData.prenoms,
                achatClientData.numero_ifu,
                achatClientData.numero_telephone,
                achatClientData.email,
                achatClientData.date_ajout
              ),
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.id_client,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    }
  }

  // =========== Defined Client ========

  static getAllOfClient(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? ORDER BY id DESC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllOfClientFromNewToOld(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? ORDER BY id DESC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllOfClientFromOldToNew(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY id ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? ORDER BY id ASC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllOfClientMostImportant(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY quantite_achetee DESC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? ORDER BY quantite_achetee DESC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  static getAllOfClientLessImportant(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY quantite_achetee ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? ORDER BY quantite_achetee ASC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
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
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? AND categorie = 'CIM BENIN' ORDER BY quantite_achetee DESC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? AND categorie = 'CIM BENIN' ORDER BY quantite_achetee DESC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
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
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? AND categorie = 'CIM BENIN' ORDER BY quantite_achetee ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? AND categorie = 'CIM BENIN' ORDER BY quantite_achetee ASC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
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
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? AND categorie = 'NOCIBE' ORDER BY quantite_achetee DESC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? AND categorie = 'NOCIBE' ORDER BY quantite_achetee DESC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
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
      const query = `SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? AND categorie = 'NOCIBE' ORDER BY quantite_achetee ASC`;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const achatsClients = results.map((achatClientData) => {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(
              achatClientData.id,
              undefined,
              achatClientData.quantite_achetee,
              achatClientData.categorie,
              achatClientData.montant,
              achatClientData.numero_ctp,
              achatClientData.bordereau,
              achatClientData.numero_bc,
              achatClientData.client_id,
              new Date(achatClientData.date_achat)
            );
          });
          return callback(null, achatsClients);
        }
      );
    } else {
      const query = `SELECT * FROM achat_client WHERE id_client = ? AND categorie = 'NOCIBE' ORDER BY quantite_achetee ASC`;
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const achatsClients = results.map((achatClientData) => {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(
            achatClientData.id,
            undefined,
            achatClientData.quantite_achetee,
            achatClientData.categorie,
            achatClientData.montant,
            achatClientData.numero_ctp,
            achatClientData.bordereau,
            achatClientData.numero_bc,
            achatClientData.client_id,
            new Date(achatClientData.date_achat)
          );
        });
        return callback(null, achatsClients);
      });
    }
  }

  update(callback) {
    const query =
      "UPDATE achat_client SET quantite_achetee = ?, categorie = ?, montant = ?, numero_ctp = ?, bordereau = ?, numero_bc = ?, id_client = ?, date_achat = ? WHERE achat_client.id = ?";
    const { id, ...achatClientData } = this;
    connection.query(
      query,
      [
        achatClientData.quantite_achetee,
        achatClientData.categorie,
        achatClientData.montant,
        achatClientData.numero_ctp,
        achatClientData.bordereau,
        achatClientData.numero_bc,
        achatClientData.id_client,
        new Date(achatClientData.date_achat),
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
    const query = "DELETE FROM achat_client WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = AchatClient;
