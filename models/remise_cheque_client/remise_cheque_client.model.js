const connection = require('../_db/database');

class RemiseChequeClient {
  constructor(id, description, banque, montant, reste, est_validee, id_client, date_remise) {
    this.id = id;
    this.description = description;
    this.banque = banque;
    this.montant = montant;
    this.reste = reste;
    this.est_validee = est_validee;
    this.id_client = id_client;
    this.date_remise = date_remise;
  }

  static create(remiseData, callback) {
    const query = 'INSERT INTO remise_cheque_client (id, description, banque, montant, reste, est_validee, id_client, date_remise) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newRemise = new RemiseChequeClient(results.insertId, ...Object.values(remiseData));
      return callback(null, newRemise);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM remise_cheque_client WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Remise de chèque client non trouvée
      }
      const remiseData = results[0];
      const remise = new RemiseChequeClient(
        remiseData.id,
        remiseData.description,
        remiseData.banque,
        remiseData.montant,
        remiseData.reste,
        remiseData.est_validee,
        remiseData.id_client,
        remiseData.date_remise,
      );
      return callback(null, remise);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM remise_cheque_client';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const remisesList = results.map((remiseData) => {
        return new RemiseChequeClient(
          remiseData.id,
          remiseData.description,
          remiseData.banque,
          remiseData.montant,
          remiseData.reste,
          remiseData.est_validee,
          remiseData.id_client,
          remiseData.date_remise,
        );
      });
      return callback(null, remisesList);
    });
  }

  update(callback) {
    const query = 'UPDATE remise_cheque_client SET description = ?, banque = ?, montant = ?, reste = ?, est_validee = ?, id_client = ?, date_remise = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [...Object.values(updatedData), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM remise_cheque_client WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = RemiseChequeClient;
