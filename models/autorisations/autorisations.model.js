const connection = require('../_db/database');

// Modèle de données pour la table autorisations
class Autorisations {
  constructor(id, role, autorisations) {
    this.id = id;
    this.role = role;
    this.autorisations = autorisations;
  }

  // Méthode pour créer une nouvelle autorisation
  static create(autorisationsData, callback) {
    const query = 'INSERT INTO autorisations SET ?';
    connection.query(query, autorisationsData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newAutorisations = new Autorisations(results.insertId, ...Object.values(autorisationsData));
      return callback(null, newAutorisations);
    });
  }

  // Méthode pour récupérer une autorisation par ID
  static getById(id, callback) {
    const query = 'SELECT * FROM autorisations WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Autorisation non trouvée
      }
      const autorisationsData = results[0];
      const autorisations = new Autorisations(
        autorisationsData.id,
        autorisationsData.role,
        autorisationsData.autorisations
      );
      return callback(null, autorisations);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table autorisations
static getAll(callback) {
  const query = 'SELECT * FROM autorisations';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const autorisations = results.map((autorisationData) => {
      return new Autorisations(
        autorisationData.id,
        autorisationData.role,
        autorisationData.autorisations,
       // JSON.parse(autorisationData.autorisations)
      );
    });
    return callback(null, autorisations);
  });
}


  // Méthode pour mettre à jour une autorisation
  update(callback) {
    const query = 'UPDATE autorisations SET ? WHERE id = ?';
    const { id, ...autorisationsData } = this;
    connection.query(query, [autorisationsData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Méthode pour supprimer une autorisation par ID
  static deleteById(id, callback) {
    const query = 'DELETE FROM autorisations WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Autres méthodes pour effectuer des opérations CRUD sur la table autorisations
}

module.exports = Autorisations;
