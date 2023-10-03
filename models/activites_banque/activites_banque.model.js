const connection = require('../_db/database');

class ActivitesBanque {
  constructor(idBanque, description, debit, credit, solde, dateActivite) {
    this.idBanque = idBanque;
    this.description = description;
    this.debit = debit;
    this.credit = credit;
    this.solde = solde;
    this.dateActivite = dateActivite;
  }

  static create(activitesBanqueData, callback) {
    const query = 'INSERT INTO activites_banque (id_banque, description, debit, credit, solde, date_activite) VALUES (?,?,?,?,?,?)';
    const currentDate = new Date();
    connection.query(query, [activitesBanqueData.idBanque, activitesBanqueData.description, activitesBanqueData.debit, activitesBanqueData.credit, activitesBanqueData.solde, currentDate], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newActivitesBanque = new ActivitesBanque(...Object.values(activitesBanqueData), currentDate);
      return callback(null, newActivitesBanque);
    });
  }

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
        activitesBanqueData.id_banque,
        activitesBanqueData.description,
        activitesBanqueData.debit,
        activitesBanqueData.credit,
        activitesBanqueData.solde,
        new Date(activitesBanqueData.date_activite)
      );
      return callback(null, activitesBanque);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM activites_banque';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const activitesBanqueList = results.map((activitesBanqueData) => {
        return new ActivitesBanque(
          activitesBanqueData.id_banque,
          activitesBanqueData.description,
          activitesBanqueData.debit,
          activitesBanqueData.credit,
          activitesBanqueData.solde,
          new Date(activitesBanqueData.date_activite)
        );
      });
      return callback(null, activitesBanqueList);
    });
  }

  update(callback) {
    const query = 'UPDATE activites_banque SET description = ?, debit = ?, credit = ?, solde = ?, date_activite = ? WHERE id_banque = ?';
    const { idBanque, ...updatedData } = this;
    connection.query(query, [updatedData.description, updatedData.debit, updatedData.credit, updatedData.solde, updatedData.dateActivite, idBanque], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM activites_banque WHERE id_banque = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = ActivitesBanque;
