const connection = require('../_db/database');

class Modifications {
  constructor(id, modification, idEmploye, dateModification) {
    this.id = id;
    this.modification = modification;
    this.idEmploye = idEmploye;
    this.dateModification = dateModification;
  }

  static create(modificationData, callback) {
    const query = 'INSERT INTO modifications SET ?';
    connection.query(query, modificationData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newModification = new Modifications(results.insertId, ...Object.values(modificationData));
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
        modificationData.date_modification
      );
      return callback(null, modification);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table modifications
static getAll(callback) {
  const query = 'SELECT * FROM modifications';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const modifications = results.map((modificationData) => {
      return new Modifications(
        modificationData.id,
        modificationData.modification,
        modificationData.id_employe,
        modificationData.date_modification
      );
    });
    return callback(null, modifications);
  });
}


  update(callback) {
    const query = 'UPDATE modifications SET ? WHERE id = ?';
    const { id, ...modificationData } = this;
    connection.query(query, [modificationData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
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
