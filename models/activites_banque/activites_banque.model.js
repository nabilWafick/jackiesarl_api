const connection = require("../_db/database");

class ActivitesBanque {
  constructor(
    id,
    id_banque,
    description,
    debit,
    credit,
    solde_actuel,
    date_activite
  ) {
    this.id = id;
    this.id_banque = id_banque;
    this.description = description;
    this.debit = debit;
    this.credit = credit;
    this.solde_actuel = solde_actuel;
    this.date_activite = date_activite;
  }

  static create(activitesBanqueData, callback) {
    const query =
      "INSERT INTO activites_banque (id,id_banque, description, debit, credit, solde_actuel, date_activite) VALUES (NULL,?,?,?,?,?,?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        activitesBanqueData.id_banque,
        activitesBanqueData.description,
        activitesBanqueData.debit,
        activitesBanqueData.credit,
        activitesBanqueData.solde_actuel,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newActivitesBanque = new ActivitesBanque(
          ...Object.values(activitesBanqueData),
          currentDate
        );
        return callback(null, newActivitesBanque);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM activites_banque WHERE id = ?";
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
        activitesBanqueData.solde_actuel,
        new Date(activitesBanqueData.date_activite)
      );
      return callback(null, activitesBanque);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM activites_banque";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const activitesBanqueList = results.map((activitesBanqueData) => {
        return new ActivitesBanque(
          activitesBanqueData.id,
          activitesBanqueData.id_banque,
          activitesBanqueData.description,
          activitesBanqueData.debit,
          activitesBanqueData.credit,
          activitesBanqueData.solde_actuel,
          new Date(activitesBanqueData.date_activite)
        );
      });
      return callback(null, activitesBanqueList);
    });
  }

  static getAllByBanqueID(id_banque, callback) {
    const query = "SELECT * FROM activites_banque WHERE id_banque = ?";
    connection.query(query, [id_banque], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const activitesBanqueList = results.map((activitesBanqueData) => {
        return new ActivitesBanque(
          activitesBanqueData.id,
          activitesBanqueData.id_banque,
          activitesBanqueData.description,
          activitesBanqueData.debit,
          activitesBanqueData.credit,
          activitesBanqueData.solde_actuel,
          new Date(activitesBanqueData.date_activite)
        );
      });
      return callback(null, activitesBanqueList);
    });
  }

  update(callback) {
    const query =
      "UPDATE activites_banque SET id_banque = ?, description = ?, debit = ?, credit = ?, solde_actuel = ?, date_activite = ? WHERE id = ?";
    const { id, ...updatedData } = this;
    connection.query(
      query,
      [
        updatedData.id_banque,
        updatedData.description,
        updatedData.debit,
        updatedData.credit,
        updatedData.solde_actuel,
        updatedData.date_activite,
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
    const query = "DELETE FROM activites_banque WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = ActivitesBanque;
