const connection = require('../_db/database');

// Modèle de données pour la table activites_depot
class ActivitesDepot {
  constructor(id, idDepot, quantiteAvantVente, vente, quantiteActuelle, versement, depense, observation, dateRemplissage) {
    this.id = id;
    this.idDepot = idDepot;
    this.quantiteAvantVente = quantiteAvantVente;
    this.vente = vente;
    this.quantiteActuelle = quantiteActuelle;
    this.versement = versement;
    this.depense = depense;
    this.observation = observation;
    this.dateRemplissage = dateRemplissage;
  }

  // Méthode pour créer une nouvelle activité de dépôt
  static create(activitesDepotData, callback) {
    const query = 'INSERT INTO activites_depot SET ?';
    connection.query(query, activitesDepotData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newActivitesDepot = new ActivitesDepot(results.insertId, ...Object.values(activitesDepotData));
      return callback(null, newActivitesDepot);
    });
  }

  // Méthode pour récupérer une activité de dépôt par ID
  static getById(id, callback) {
    const query = 'SELECT * FROM activites_depot WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Activité de dépôt non trouvée
      }
      const activitesDepotData = results[0];
      const activitesDepot = new ActivitesDepot(
        activitesDepotData.id,
        activitesDepotData.id_depot,
        activitesDepotData.quantite_avant_vente,
        activitesDepotData.vente,
        activitesDepotData.quantite_actuelle,
        activitesDepotData.versement,
        activitesDepotData.depense,
        activitesDepotData.observation,
        activitesDepotData.date_remplissage
      );
      return callback(null, activitesDepot);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table activites_depot
static getAll(callback) {
  const query = 'SELECT * FROM activites_depot';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const activitesDepot = results.map((activiteDepotData) => {
      return new ActiviteDepot(
        activiteDepotData.id,
        activiteDepotData.id_depot,
        activiteDepotData.quantite_avant_vente,
        activiteDepotData.vente,
        activiteDepotData.quantite_actuelle,
        activiteDepotData.versement,
        activiteDepotData.depense,
        activiteDepotData.observation,
        activiteDepotData.date_remplissage
      );
    });
    return callback(null, activitesDepot);
  });
}


  // Méthode pour mettre à jour une activité de dépôt
  update(callback) {
    const query = 'UPDATE activites_depot SET ? WHERE id = ?';
    const { id, ...activitesDepotData } = this;
    connection.query(query, [activitesDepotData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Méthode pour supprimer une activité de dépôt par ID
  static deleteById(id, callback) {
    const query = 'DELETE FROM activites_depot WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Autres méthodes pour effectuer des opérations CRUD sur la table activites_depot
}

module.exports = ActivitesDepot;
