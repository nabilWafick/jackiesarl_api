const connection = require('../_db/database');

class ActivitesDepot {
  constructor(idDepot, quantiteAvantVente, vente, quantiteActuelle, versement, depense, observation, dateRemplissage) {
    this.idDepot = idDepot;
    this.quantiteAvantVente = quantiteAvantVente;
    this.vente = vente;
    this.quantiteActuelle = quantiteActuelle;
    this.versement = versement;
    this.depense = depense;
    this.observation = observation;
    this.dateRemplissage = dateRemplissage;
  }

  static create(activitesDepotData, callback) {
    const query = 'INSERT INTO activites_depot (id_depot, quantite_avant_vente, vente, quantite_actuelle, versement, depense, observation, date_remplissage) VALUES (?,?,?,?,?,?,?,?)';
    const currentDate = new Date();
    connection.query(query, [activitesDepotData.idDepot, activitesDepotData.quantiteAvantVente, activitesDepotData.vente, activitesDepotData.quantiteActuelle, activitesDepotData.versement, activitesDepotData.depense, activitesDepotData.observation, currentDate], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newActivitesDepot = new ActivitesDepot(...Object.values(activitesDepotData), currentDate);
      return callback(null, newActivitesDepot);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM activites_depot WHERE id_depot = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Activité dépôt non trouvée
      }
      const activitesDepotData = results[0];
      const activitesDepot = new ActivitesDepot(
        activitesDepotData.id_depot,
        activitesDepotData.quantite_avant_vente,
        activitesDepotData.vente,
        activitesDepotData.quantite_actuelle,
        activitesDepotData.versement,
        activitesDepotData.depense,
        activitesDepotData.observation,
        new Date(activitesDepotData.date_remplissage)
      );
      return callback(null, activitesDepot);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM activites_depot';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const activitesDepotList = results.map((activitesDepotData) => {
        return new ActivitesDepot(
          activitesDepotData.id_depot,
          activitesDepotData.quantite_avant_vente,
          activitesDepotData.vente,
          activitesDepotData.quantite_actuelle,
          activitesDepotData.versement,
          activitesDepotData.depense,
          activitesDepotData.observation,
          new Date(activitesDepotData.date_remplissage)
        );
      });
      return callback(null, activitesDepotList);
    });
  }

  update(callback) {
    const query = 'UPDATE activites_depot SET quantite_avant_vente = ?, vente = ?, quantite_actuelle = ?, versement = ?, depense = ?, observation = ?, date_remplissage = ? WHERE id_depot = ?';
    const { idDepot, ...updatedData } = this;
    connection.query(query, [updatedData.quantiteAvantVente, updatedData.vente, updatedData.quantiteActuelle, updatedData.versement, updatedData.depense, updatedData.observation, updatedData.dateRemplissage, idDepot], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM activites_depot WHERE id_depot = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = ActivitesDepot;
