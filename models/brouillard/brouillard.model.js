const connection = require('../_db/database');

// Modèle de données pour la table brouillard
class Brouillard {
  constructor(id, depot, stockActuel, nomGerant, numeroGerant) {
    this.id = id;
    this.depot = depot;
    this.stockActuel = stockActuel;
    this.nomGerant = nomGerant;
    this.numeroGerant = numeroGerant;
  }

  // Méthode pour créer un nouveau brouillard
  static create(brouillardData, callback) {
    const query = 'INSERT INTO brouillard SET ?';
    connection.query(query, brouillardData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newBrouillard = new Brouillard(results.insertId, ...Object.values(brouillardData));
      return callback(null, newBrouillard);
    });
  }

  // Méthode pour récupérer un brouillard par ID
  static getById(id, callback) {
    const query = 'SELECT * FROM brouillard WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Brouillard non trouvé
      }
      const brouillardData = results[0];
      const brouillard = new Brouillard(
        brouillardData.id,
        brouillardData.depot,
        brouillardData.stock_actuel,
        brouillardData.nom_gerant,
        brouillardData.numero_gerant
      );
      return callback(null, brouillard);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table brouillard
static getAll(callback) {
  const query = 'SELECT * FROM brouillard';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const brouillards = results.map((brouillardData) => {
      return new Brouillard(
        brouillardData.id,
        brouillardData.depot,
        brouillardData.stock_actuel,
        brouillardData.nom_gerant,
        brouillardData.numero_gerant
      );
    });
    return callback(null, brouillards);
  });
}


  // Méthode pour mettre à jour un brouillard
  update(callback) {
    const query = 'UPDATE brouillard SET ? WHERE id = ?';
    const { id, ...brouillardData } = this;
    connection.query(query, [brouillardData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Méthode pour supprimer un brouillard par ID
  static deleteById(id, callback) {
    const query = 'DELETE FROM brouillard WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Autres méthodes pour effectuer des opérations CRUD sur la table brouillard
}

module.exports = Brouillard;
