const connection = require('../_db/database');

class Rapports {
  constructor(id, rapport, date_envoi, id_employe) {
    this.id = id;
    this.rapport = rapport;
    this.date_envoi = date_envoi;
    this.id_employe = id_employe;
  }

  static create(rapportData, callback) {
    const query = 'INSERT INTO rapports (id, rapport, date_envoi, id_employe) VALUES (NULL, ?, ?, ?)';
    connection.query(query, [rapportData.rapport, rapportData.date_envoi, rapportData.id_employe], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newRapport = new Rapports(results.insertId, ...Object.values(rapportData));
      return callback(null, newRapport);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM rapports WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Rapport non trouvé
      }
      const rapportData = results[0];
      const rapport = new Rapports(
        rapportData.id,
        rapportData.rapport,
        rapportData.date_envoi,
        rapportData.id_employe,
      );
      return callback(null, rapport);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM rapports';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const rapportsList = results.map((rapportData) => {
        return new Rapports(
          rapportData.id,
          rapportData.rapport,
          rapportData.date_envoi,
          rapportData.id_employe,
        );
      });
      return callback(null, rapportsList);
    });
  }

  update(callback) {
    const query = 'UPDATE rapports SET rapport = ?, date_envoi = ?, id_employe = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [...Object.values(updatedData), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM rapports WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Rapports;
