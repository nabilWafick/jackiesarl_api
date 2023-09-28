const connection = require('../_db/database');

class Rapports {
  constructor(id, rapport, dateEnvoi, idEmploye) {
    this.id = id;
    this.rapport = rapport;
    this.dateEnvoi = dateEnvoi;
    this.idEmploye = idEmploye;
  }

  static create(rapportsData, callback) {
    const query = 'INSERT INTO rapports SET ?';
    connection.query(query, rapportsData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newRapports = new Rapports(results.insertId, ...Object.values(rapportsData));
      return callback(null, newRapports);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM rapports WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const rapportsData = results[0];
      const rapports = new Rapports(
        rapportsData.id,
        rapportsData.rapport,
        rapportsData.date_envoi,
        rapportsData.id_employe
      );
      return callback(null, rapports);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table rapports
static getAll(callback) {
  const query = 'SELECT * FROM rapports';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const rapports = results.map((rapportData) => {
      return new Rapports(
        rapportData.id,
        rapportData.rapport,
        rapportData.date_envoi,
        rapportData.id_employe
      );
    });
    return callback(null, rapports);
  });
}


  update(callback) {
    const query = 'UPDATE rapports SET ? WHERE id = ?';
    const { id, ...rapportsData } = this;
    connection.query(query, [rapportsData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }


  delete(callback) {
    const query = 'DELETE FROM rapports WHERE id = ?';
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Rapports;
