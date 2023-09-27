const connection = require('../_db/database');

// Modèle de données pour la table activites_banque
class ActivitesBanque {
  constructor(id, idBanque, description, debit, credit, solde, dateActivite) {
    this.id = id;
    this.idBanque = idBanque;
    this.description = description;
    this.debit = debit;
    this.credit = credit;
    this.solde = solde;
    this.dateActivite = dateActivite;
  }

  // Méthode pour créer une nouvelle activité banque
  static create(activitesBanqueData, callback) {
    const query = 'INSERT INTO activites_banque SET ?';
    connection.query(query, activitesBanqueData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newActivitesBanque = new ActivitesBanque(results.insertId, ...Object.values(activitesBanqueData));
      return callback(null, newActivitesBanque);
    });
  }

  // Méthode pour récupérer une activité banque par ID
  static getById(id, callback) {
    const query = 'SELECT * FROM activites_banque WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Activité banque non trouvée
      }
      const activitesBanqueData = results[0];
      const activitesBanque = new ActivitesBanque(
        activitesBanqueData.id,
        activitesBanqueData.id_banque,
        activitesBanqueData.description,
        activitesBanqueData.debit,
        activitesBanqueData.credit,
        activitesBanqueData.solde,
        activitesBanqueData.date_activite
      );
      return callback(null, activitesBanque);
    });
  }

  // Méthode pour mettre à jour une activité banque
  update(callback) {
    const query = 'UPDATE activites_banque SET ? WHERE id = ?';
    const { id, ...activitesBanqueData } = this;
    connection.query(query, [activitesBanqueData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Méthode pour supprimer une activité banque par ID
  static deleteById(id, callback) {
    const query = 'DELETE FROM activites_banque WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Autres méthodes pour effectuer des opérations CRUD sur la table activites_banque
}

module.exports = ActivitesBanque;
