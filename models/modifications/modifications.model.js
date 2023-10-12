const connection = require('../_db/database');

class Modifications {
  constructor(id, modification, id_employe, date_modification) {
    this.id = id;
    this.modification = modification;
    this.id_employe = id_employe;
    this.date_modification = date_modification;
  }

  static create(modificationData, callback) {
    const query = 'INSERT INTO modifications (id, modification, id_employe, date_modification) VALUES (NULL, ?, ?, ?)';
    const currentDate = new Date();
    connection.query(query, [modificationData.modification, modificationData.id_employe, currentDate], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newModification = new Modifications(results.insertId, ...Object.values(modificationData), currentDate);
      return callback(null, newModification);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM modifications WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Modification non trouvée
      }
      const modificationData = results[0];
      const modification = new Modifications(
        modificationData.id,
        modificationData.modification,
        modificationData.id_employe,
        modificationData.date_modification,
      );
      return callback(null, modification);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM modifications';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const modificationsList = results.map((modificationData) => {
        return new Modifications(
          modificationData.id,
          modificationData.modification,
          modificationData.id_employe,
          modificationData.date_modification,
        );
      });
      return callback(null, modificationsList);
    });
  }

  update(callback) {
    const query = 'UPDATE modifications SET modification = ?, id_employe = ?, date_modification = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [...Object.values(updatedData), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM modifications WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Modifications;
