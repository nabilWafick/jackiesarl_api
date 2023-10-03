const connection = require('../_db/database');

class Creances {
  constructor(id, creance_cim_benin, creance_nocibe, creance_autres, date_creance, id_client) {
    this.id = id;
    this.creance_cim_benin = creance_cim_benin;
    this.creance_nocibe = creance_nocibe;
    this.creance_autres = creance_autres;
    this.date_creance = date_creance;
    this.id_client = id_client;
  }

  static create(creancesData, callback) {
    const query = 'INSERT INTO creances (id, creance_cim_benin, creance_nocibe, creance_autres, date_creance, id_client) VALUES (NULL, ?, ?, ?, ?, ?)';
    connection.query(query, [creancesData.creance_cim_benin, creancesData.creance_nocibe, creancesData.creance_autres, creancesData.date_creance, creancesData.id_client], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newCreances = new Creances(results.insertId, ...Object.values(creancesData));
      return callback(null, newCreances);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM creances WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Créance non trouvée
      }
      const creancesData = results[0];
      const creances = new Creances(
        creancesData.id,
        creancesData.creance_cim_benin,
        creancesData.creance_nocibe,
        creancesData.creance_autres,
        creancesData.date_creance,
        creancesData.id_client,
      );
      return callback(null, creances);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM creances';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const creancesList = results.map((creancesData) => {
        return new Creances(
          creancesData.id,
          creancesData.creance_cim_benin,
          creancesData.creance_nocibe,
          creancesData.creance_autres,
          creancesData.date_creance,
          creancesData.id_client,
        );
      });
      return callback(null, creancesList);
    });
  }

  update(callback) {
    const query = 'UPDATE creances SET creance_cim_benin = ?, creance_nocibe = ?, creance_autres = ?, date_creance = ?, id_client = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [...Object.values(updatedData), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM creances WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Creances;
