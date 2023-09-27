const connection = require('../_db/database');

// Modèle de données pour la table avance
class Avance {
  constructor(id, montant, idClient, dateAvance) {
    this.id = id;
    this.montant = montant;
    this.idClient = idClient;
    this.dateAvance = dateAvance;
  }

  // Méthode pour créer une nouvelle avance
  static create(avanceData, callback) {
    const query = 'INSERT INTO avance SET ?';
    connection.query(query, avanceData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newAvance = new Avance(results.insertId, ...Object.values(avanceData));
      return callback(null, newAvance);
    });
  }

  // Méthode pour récupérer une avance par ID
  static getById(id, callback) {
    const query = 'SELECT * FROM avance WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Avance non trouvée
      }
      const avanceData = results[0];
      const avance = new Avance(
        avanceData.id,
        avanceData.montant,
        avanceData.id_client,
        avanceData.date_avance
      );
      return callback(null, avance);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table avance
static getAll(callback) {
  const query = 'SELECT * FROM avance';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const avances = results.map((avanceData) => {
      return new Avance(
        avanceData.id,
        avanceData.montant,
        avanceData.id_client,
        avanceData.date_avance
      );
    });
    return callback(null, avances);
  });
}


  // Méthode pour mettre à jour une avance
  update(callback) {
    const query = 'UPDATE avance SET ? WHERE id = ?';
    const { id, ...avanceData } = this;
    connection.query(query, [avanceData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Méthode pour supprimer une avance par ID
  static deleteById(id, callback) {
    const query = 'DELETE FROM avance WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Autres méthodes pour effectuer des opérations CRUD sur la table avance
}

module.exports = Avance;
