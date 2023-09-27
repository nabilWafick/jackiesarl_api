const connection = require('../_db/database');

class RemiseChequeClient {
  constructor(id, description, banque, montant, reste, estValide, idClient, dateRemise) {
    this.id = id;
    this.description = description;
    this.banque = banque;
    this.montant = montant;
    this.reste = reste;
    this.estValide = estValide;
    this.idClient = idClient;
    this.dateRemise = dateRemise;
  }

  static create(remiseChequeClientData, callback) {
    const query = 'INSERT INTO remise_cheque_client SET ?';
    connection.query(query, remiseChequeClientData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newRemiseChequeClient = new RemiseChequeClient(results.insertId, ...Object.values(remiseChequeClientData));
      return callback(null, newRemiseChequeClient);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM remise_cheque_client WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const remiseChequeClientData = results[0];
      const remiseChequeClient = new RemiseChequeClient(
        remiseChequeClientData.id,
        remiseChequeClientData.description,
        remiseChequeClientData.banque,
        remiseChequeClientData.montant,
        remiseChequeClientData.reste,
        remiseChequeClientData.est_valide,
        remiseChequeClientData.id_client,
        remiseChequeClientData.date_remise
      );
      return callback(null, remiseChequeClient);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table remise_cheque_client
static getAll(callback) {
  const query = 'SELECT * FROM remise_cheque_client';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const remisesChequeClient = results.map((remiseData) => {
      return new RemiseChequeClient(
        remiseData.id,
        remiseData.description,
        remiseData.banque,
        remiseData.montant,
        remiseData.reste,
        remiseData.est_valide,
        remiseData.id_client,
        remiseData.date_remise
      );
    });
    return callback(null, remisesChequeClient);
  });
}

  update(callback) {
    const query = 'UPDATE remise_cheque_client SET ? WHERE id = ?';
    const { id, ...remiseChequeClientData } = this;
    connection.query(query, [remiseChequeClientData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  delete(callback) {
    const query = 'DELETE FROM remise_cheque_client WHERE id = ?';
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = RemiseChequeClient;
