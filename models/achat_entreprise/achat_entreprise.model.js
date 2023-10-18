const connection = require("../_db/database");

class AchatEntreprise {
  constructor(
    bon_commande,
    quantite_achetee,
    montant,
    banque,
    cheque,
    bordereau,
    date_achat
  ) {
    this.bon_commande = bon_commande;
    this.quantite_achetee = quantite_achetee;
    this.montant = montant;
    this.banque = banque;
    this.cheque = cheque;
    this.bordereau = bordereau;
    this.date_achat = date_achat;
  }

  static create(achatEntrepriseData, callback) {
    const query =
      "INSERT INTO achat_entreprise (bon_commande, quantite_achetee, montant, banque, cheque, bordereau, date_achat) VALUES (?,?,?,?,?,?,?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        achatEntrepriseData.bon_commande,
        achatEntrepriseData.quantite_achetee,
        achatEntrepriseData.montant,
        achatEntrepriseData.banque,
        achatEntrepriseData.cheque,
        achatEntrepriseData.bordereau,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newAchatEntreprise = new AchatEntreprise(
          ...Object.values(achatEntrepriseData),
          currentDate
        );
        return callback(null, newAchatEntreprise);
      }
    );
  }

  static getByBon_commande(bon_commande, callback) {
    const query = "SELECT * FROM achat_entreprise WHERE bon_commande = ?";
    connection.query(query, [bon_commande], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Achat entreprise non trouvé
      }
      const achatEntrepriseData = results[0];
      const achatEntreprise = new AchatEntreprise(
        achatEntrepriseData.bon_commande,
        achatEntrepriseData.quantite_achetee,
        achatEntrepriseData.montant,
        achatEntrepriseData.banque,
        achatEntrepriseData.cheque,
        achatEntrepriseData.bordereau,
        new Date(achatEntrepriseData.date_achat)
      );
      return callback(null, achatEntreprise);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM achat_entreprise";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const achatsEntreprise = results.map((achatEntrepriseData) => {
        return new AchatEntreprise(
          achatEntrepriseData.bon_commande,
          achatEntrepriseData.quantite_achetee,
          achatEntrepriseData.montant,
          achatEntrepriseData.banque,
          achatEntrepriseData.cheque,
          achatEntrepriseData.bordereau,
          new Date(achatEntrepriseData.date_achat)
        );
      });
      return callback(null, achatsEntreprise);
    });
  }

  update(callback) {
    const query =
      "UPDATE achat_entreprise SET quantite_achetee = ?, montant = ?, banque = ?, cheque = ?, bordereau = ?, date_achat = ? WHERE bon_commande = ?";
    const { bon_commande, ...updatedData } = this;
    connection.query(
      query,
      [
        updatedData.quantite_achetee,
        updatedData.montant,
        updatedData.banque,
        updatedData.cheque,
        updatedData.bordereau,
        updatedData.date_achat,
        bon_commande,
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
    const query = "DELETE FROM achat_entreprise WHERE bon_commande = ?";
    connection.query(query, [this.bon_commande], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.bon_commande);
    });
  }
}

module.exports = AchatEntreprise;
