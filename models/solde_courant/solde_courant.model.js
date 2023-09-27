const connection = require('../_db/database');

class SoldeCourant {
  constructor(id, banque, numeroCompte, soldeActuel, dateAjout) {
    this.id = id;
    this.banque = banque;
    this.numeroCompte = numeroCompte;
    this.soldeActuel = soldeActuel;
    this.dateAjout = dateAjout;
  }

  static create(soldeCourantData, callback) {
    const query = 'INSERT INTO solde_courant SET ?';
    connection.query(query, soldeCourantData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newSoldeCourant = new SoldeCourant(results.insertId, ...Object.values(soldeCourantData));
      return callback(null, newSoldeCourant);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM solde_courant WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const soldeCourantData = results[0];
      const soldeCourant = new SoldeCourant(
        soldeCourantData.id,
        soldeCourantData.banque,
        soldeCourantData.numero_compte,
        soldeCourantData.solde_actuel,
        soldeCourantData.date_ajout
      );
      return callback(null, soldeCourant);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table solde_courant
static getAll(callback) {
  const query = 'SELECT * FROM solde_courant';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const soldesCourant = results.map((soldeData) => {
      return new SoldeCourant(
        soldeData.id,
        soldeData.banque,
        soldeData.numero_compte,
        soldeData.solde_actuel,
        soldeData.date_ajout
      );
    });
    return callback(null, soldesCourant);
  });
}


  update(callback) {
    const query = 'UPDATE solde_courant SET ? WHERE id = ?';
    const { id, ...soldeCourantData } = this;
    connection.query(query, [soldeCourantData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  delete(callback) {
    const query = 'DELETE FROM solde_courant WHERE id = ?';
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = SoldeCourant;
