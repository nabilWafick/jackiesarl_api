const connection = require('../_db/database');

class SoldeCourant {
  constructor(id, banque, numero_compte, solde_actuel, date_ajout) {
    this.id = id;
    this.banque = banque;
    this.numero_compte = numero_compte;
    this.solde_actuel = solde_actuel;
    this.date_ajout = date_ajout;
  }

  static create(soldeData, callback) {
    const query = 'INSERT INTO solde_courant (id, banque, numero_compte, solde_actuel, date_ajout) VALUES (NULL, ?, ?, ?, ?)';
    const currentDate = new Date();
    connection.query(query, [soldeData.banque, soldeData.numero_compte, soldeData.solde_actuel, currentDate], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newSolde = new SoldeCourant(results.insertId, ...Object.values(soldeData),currentDate);
      return callback(null, newSolde);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM solde_courant WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Solde courant non trouvé
      }
      const soldeData = results[0];
      const solde = new SoldeCourant(
        soldeData.id,
        soldeData.banque,
        soldeData.numero_compte,
        soldeData.solde_actuel,
        soldeData.date_ajout,
      );
      return callback(null, solde);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM solde_courant';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const soldesList = results.map((soldeData) => {
        return new SoldeCourant(
          soldeData.id,
          soldeData.banque,
          soldeData.numero_compte,
          soldeData.solde_actuel,
          soldeData.date_ajout,
        );
      });
      return callback(null, soldesList);
    });
  }

  update(callback) {
    const query = 'UPDATE solde_courant SET banque = ?, numero_compte = ?, solde_actuel = ?, date_ajout = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [...Object.values(updatedData), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM solde_courant WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = SoldeCourant;
