const connection = require('../_db/database');

class Creances {
  constructor(id, creanceCimBenin, creanceNocibe, creanceAutres, dateCreance, idClient) {
    this.id = id;
    this.creanceCimBenin = creanceCimBenin;
    this.creanceNocibe = creanceNocibe;
    this.creanceAutres = creanceAutres;
    this.dateCreance = dateCreance;
    this.idClient = idClient;
  }

  static create(creanceData, callback) {
    const query = 'INSERT INTO creances SET ?';
    connection.query(query, creanceData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newCreance = new Creances(results.insertId, ...Object.values(creanceData));
      return callback(null, newCreance);
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
      const creanceData = results[0];
      const creance = new Creances(
        creanceData.id,
        creanceData.creance_cim_benin,
        creanceData.creance_nocibe,
        creanceData.creance_autres,
        creanceData.date_creance,
        creanceData.id_client
      );
      return callback(null, creance);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table creances
static getAll(callback) {
  const query = 'SELECT * FROM creances';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const creances = results.map((creanceData) => {
      return new Creance(
        creanceData.id,
        creanceData.creance_cim_benin,
        creanceData.creance_nocibe,
        creanceData.creance_autres,
        creanceData.date_creance,
        creanceData.id_client
      );
    });
    return callback(null, creances);
  });
}



  update(callback) {
    const query = 'UPDATE creances SET ? WHERE id = ?';
    const { id, ...creanceData } = this;
    connection.query(query, [creanceData, id], (error, results) => {
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
