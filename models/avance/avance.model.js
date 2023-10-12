const connection = require('../_db/database');

class Avance {
  constructor(id, montant, id_client, date_avance) {
    this.id = id;
    this.montant = montant;
    this.id_client = id_client;
    this.date_avance = date_avance;
  }

  static create(avanceData, callback) {
    const query = 'INSERT INTO avance (montant, id_client, date_avance) VALUES (?, ?, ?)';
    const currentDate = new Date();
    connection.query(query, [avanceData.montant, avanceData.id_client, currentDate], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newAvance = new Avance(results.insertId, avanceData.montant, avanceData.id_client, currentDate);
      return callback(null, newAvance);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM avance WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Avance non trouvée
      }
      const avanceData = results[0];
      const avance = new Avance(avanceData.id, avanceData.montant, avanceData.id_client, new Date(avanceData.date_avance));
      return callback(null, avance);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM avance';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const avanceList = results.map((avanceData) => {
        return new Avance(avanceData.id, avanceData.montant, avanceData.id_client, new Date(avanceData.date_avance));
      });
      return callback(null, avanceList);
    });
  }

  update(callback) {
    const query = 'UPDATE avance SET montant = ?, id_client = ?, date_avance = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [updatedData.montant, updatedData.id_client, updatedData.date_avance, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM avance WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Avance;
