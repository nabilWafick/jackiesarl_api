const connection = require('../_db/database');

class Depenses {
  constructor(id, description, montant, piece, estValide, dateDepense) {
    this.id = id;
    this.description = description;
    this.montant = montant;
    this.piece = piece;
    this.estValide = estValide;
    this.dateDepense = dateDepense;
  }

  static create(depenseData, callback) {
    const query = 'INSERT INTO depenses SET ?';
    connection.query(query, depenseData, (error, results) => {
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
        depenseData.est_valide,
        depenseData.date_depense
      );
      return callback(null, depense);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table depenses
static getAll(callback) {
  const query = 'SELECT * FROM depenses';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const depenses = results.map((depenseData) => {
      return new Depense(
        depenseData.id,
        depenseData.description,
        depenseData.montant,
        depenseData.piece,
        depenseData.est_valide,
        depenseData.date_depense
      );
    });
    return callback(null, depenses);
  });
}


  update(callback) {
    const query = 'UPDATE depenses SET ? WHERE id = ?';
    const { id, ...depenseData } = this;
    connection.query(query, [depenseData, id], (error, results) => {
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
