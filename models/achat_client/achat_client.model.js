const connection = require('../_db/database');

class AchatClient {
  constructor(id, quantiteAchetee, categorie, montant, numeroCtp, bordereau, numeroBc, idClient, dateAchat) {
    this.id = id;
    this.quantiteAchetee = quantiteAchetee;
    this.categorie = categorie;
    this.montant = montant;
    this.numeroCtp = numeroCtp;
    this.bordereau = bordereau;
    this.numeroBc = numeroBc;
    this.idClient = idClient;
    this.dateAchat = dateAchat;
  }

  static create(achatClientData, callback) {
    const query = 'INSERT INTO achat_client (id, quantite_achetee, categorie, montant, numero_ctp, bordereau, numero_bc, id_client, date_achat) VALUES (NULL,?,?,?,?,?,?,?,?)';
    const currentDate = new Date();
    connection.query(query, [achatClientData.quantiteAchetee, achatClientData.categorie, achatClientData.montant, achatClientData.numeroCtp, achatClientData.bordereau, achatClientData.numeroBc, achatClientData.idClient, currentDate], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newAchatClient = new AchatClient(results.insertId, ...Object.values(achatClientData), currentDate);
      return callback(null, newAchatClient);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM achat_client WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Achat client non trouvé
      }
      const achatClientData = results[0];
      const achatClient = new AchatClient(
        achatClientData.id,
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

  static getAll(callback) {
    const query = 'SELECT * FROM achat_client';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const achatsClients = results.map((achatClientData) => {
        return new AchatClient(
          achatClientData.id,
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

  update(callback) {
    const query = 'UPDATE achat_client SET quantite_achetee = ?, categorie = ?, montant = ?, numero_ctp = ?, bordereau = ?, numero_bc = ?, id_client = ?, date_achat = ? WHERE achat_client.id = ?';
    const { id, ...achatClientData } = this;
    connection.query(query, [achatClientData.quantiteAchetee, achatClientData.categorie, achatClientData.montant, achatClientData.numeroCtp, achatClientData.bordereau, achatClientData.numeroBc, achatClientData.idClient, new Date(achatClientData.dateAchat), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  delete(callback) {
    const query = 'DELETE FROM achat_client WHERE id = ?';
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = AchatClient;
