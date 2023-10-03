const connection = require('../_db/database');

class Depenses {
  constructor(id, description, montant, piece, est_validee, date_depense) {
    this.id = id;
    this.description = description;
    this.montant = montant;
    this.piece = piece;
    this.est_validee = est_validee;
    this.date_depense = date_depense;
  }

  static create(depenseData, callback) {
    const query = 'INSERT INTO depenses (id, description, montant, piece, est_validee, date_depense) VALUES (NULL, ?, ?, ?, ?, ?)';
    connection.query(query, [depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newDepense = new Depenses(results.insertId, ...Object.values(depenseData));
      return callback(null, newDepense);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM depenses WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Dépense non trouvée
      }
      const depenseData = results[0];
      const depense = new Depenses(
        depenseData.id,
        depenseData.description,
        depenseData.montant,
        depenseData.piece,
        depenseData.est_validee,
        depenseData.date_depense,
      );
      return callback(null, depense);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM depenses';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const depensesList = results.map((depenseData) => {
        return new Depenses(
          depenseData.id,
          depenseData.description,
          depenseData.montant,
          depenseData.piece,
          depenseData.est_validee,
          depenseData.date_depense,
        );
      });
      return callback(null, depensesList);
    });
  }

  update(callback) {
    const query = 'UPDATE depenses SET description = ?, montant = ?, piece = ?, est_validee = ?, date_depense = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [...Object.values(updatedData), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM depenses WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Depenses;
