const connection = require('../_db/database');

class PaiementClient {
  constructor(id, montant, banque, reference, categorie, numeroBc, bordereau, estValide, idClient, datePaiement) {
    this.id = id;
    this.montant = montant;
    this.banque = banque;
    this.reference = reference;
    this.categorie = categorie;
    this.numeroBc = numeroBc;
    this.bordereau = bordereau;
    this.estValide = estValide;
    this.idClient = idClient;
    this.datePaiement = datePaiement;
  }

  static create(paiementClientData, callback) {
    const query = 'INSERT INTO paiement_client SET ?';
    connection.query(query, paiementClientData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newPaiementClient = new PaiementClient(results.insertId, ...Object.values(paiementClientData));
      return callback(null, newPaiementClient);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM paiement_client WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const paiementClientData = results[0];
      const paiementClient = new PaiementClient(
        paiementClientData.id,
        paiementClientData.montant,
        paiementClientData.banque,
        paiementClientData.reference,
        paiementClientData.categorie,
        paiementClientData.numero_bc,
        paiementClientData.bordereau,
        paiementClientData.est_valide,
        paiementClientData.id_client,
        paiementClientData.date_paiement
      );
      return callback(null, paiementClient);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table paiement_client
static getAll(callback) {
  const query = 'SELECT * FROM paiement_client';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const paiementsClient = results.map((paiementData) => {
      return new PaiementClient(
        paiementData.id,
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
    return callback(null, paiementsClient);
  });
}


  update(callback) {
    const query = 'UPDATE paiement_client SET ? WHERE id = ?';
    const { id, ...paiementClientData } = this;
    connection.query(query, [paiementClientData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  delete(callback) {
    const query = 'DELETE FROM paiement_client WHERE id = ?';
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = PaiementClient;
