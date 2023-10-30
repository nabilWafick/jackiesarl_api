const connection = require("../_db/database");

class ActivitesDepot {
  constructor(
    id,
    id_depot,
    quantite_avant_vente,
    vente,
    quantite_apres_vente,
    versement,
    depense,
    observation,
    date_remplissage
  ) {
    this.id = id;
    this.id_depot = id_depot;
    this.quantite_avant_vente = quantite_avant_vente;
    this.vente = vente;
    this.quantite_apres_vente = quantite_apres_vente;
    this.versement = versement;
    this.depense = depense;
    this.observation = observation;
    this.date_remplissage = date_remplissage;
  }

  static create(activitesDepotData, callback) {
    const query =
      "INSERT INTO activites_depot (id,id_depot, quantite_avant_vente, vente, quantite_apres_vente, versement, depense, observation, date_remplissage) VALUES (NULL,?,?,?,?,?,?,?,?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        activitesDepotData.id_depot,
        activitesDepotData.quantite_avant_vente,
        activitesDepotData.vente,
        activitesDepotData.quantite_apres_vente,
        activitesDepotData.versement,
        activitesDepotData.depense,
        activitesDepotData.observation,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newActivitesDepot = new ActivitesDepot(
          ...Object.values(activitesDepotData),
          currentDate
        );
        return callback(null, newActivitesDepot);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM activites_depot WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Activité dépôt non trouvée
      }
      const activitesDepotData = results[0];
      const activitesDepot = new ActivitesDepot(
        activitesDepotData.id,
        activitesDepotData.id_depot,
        activitesDepotData.quantite_avant_vente,
        activitesDepotData.vente,
        activitesDepotData.quantite_apres_vente,
        activitesDepotData.versement,
        activitesDepotData.depense,
        activitesDepotData.observation,
        new Date(activitesDepotData.date_remplissage)
      );
      return callback(null, activitesDepot);
    });
  }

  static getLastActiviteDepot(id_depot, callback) {
    const query =
      "SELECT * FROM activites_depot WHERE id_depot = ? ORDER BY id DESC LIMIT 1 ";
    connection.query(query, [id_depot], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Activité dépôt non trouvée
      }
      const activitesDepotData = results[0];
      const activitesDepot = new ActivitesDepot(
        activitesDepotData.id,
        activitesDepotData.id_depot,
        activitesDepotData.quantite_avant_vente,
        activitesDepotData.vente,
        activitesDepotData.quantite_apres_vente,
        activitesDepotData.versement,
        activitesDepotData.depense,
        activitesDepotData.observation,
        new Date(activitesDepotData.date_remplissage)
      );
      return callback(null, activitesDepot);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM activites_depot ORDER BY id DESC";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const activitesDepotList = results.map((activitesDepotData) => {
        return new ActivitesDepot(
          activitesDepotData.id,
          activitesDepotData.id_depot,
          activitesDepotData.quantite_avant_vente,
          activitesDepotData.vente,
          activitesDepotData.quantite_apres_vente,
          activitesDepotData.versement,
          activitesDepotData.depense,
          activitesDepotData.observation,
          new Date(activitesDepotData.date_remplissage)
        );
      });
      return callback(null, activitesDepotList);
    });
  }

  static getAllByDepotID(startDate, endDate, id_depot, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM activites_depot WHERE date_remplissage BETWEEN ? AND ? AND id_depot = ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_depot],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const activitesDepotList = results.map((activitesDepotData) => {
            return new ActivitesDepot(
              activitesDepotData.id,
              activitesDepotData.id_depot,
              activitesDepotData.quantite_avant_vente,
              activitesDepotData.vente,
              activitesDepotData.quantite_apres_vente,
              activitesDepotData.versement,
              activitesDepotData.depense,
              activitesDepotData.observation,
              new Date(activitesDepotData.date_remplissage)
            );
          });
          //console.log(activitesDepotList.length);
          return callback(null, activitesDepotList);
        }
      );
    } else {
      const query =
        "SELECT * FROM activites_depot WHERE id_depot = ? ORDER BY id DESC";
      connection.query(query, [id_depot], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const activitesDepotList = results.map((activitesDepotData) => {
          return new ActivitesDepot(
            activitesDepotData.id,
            activitesDepotData.id_depot,
            activitesDepotData.quantite_avant_vente,
            activitesDepotData.vente,
            activitesDepotData.quantite_apres_vente,
            activitesDepotData.versement,
            activitesDepotData.depense,
            activitesDepotData.observation,
            new Date(activitesDepotData.date_remplissage)
          );
        });
        //console.log(activitesDepotList.length);
        return callback(null, activitesDepotList);
      });
    }
  }

  update(callback) {
    const query =
      "UPDATE activites_depot SET id_depot = ?, quantite_avant_vente = ?, vente = ?, quantite_apres_vente = ?, versement = ?, depense = ?, observation = ?, date_remplissage = ? WHERE id = ?";
    const { id, ...updatedData } = this;
    connection.query(
      query,
      [
        updatedData.id_depot,
        updatedData.quantite_avant_vente,
        updatedData.vente,
        updatedData.quantite_apres_vente,
        updatedData.versement,
        updatedData.depense,
        updatedData.observation,
        new Date(updatedData.date_remplissage),
        id,
      ],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null);
      }
    );
  }

  delete(callback) {
    const query = "DELETE FROM activites_depot WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = ActivitesDepot;
