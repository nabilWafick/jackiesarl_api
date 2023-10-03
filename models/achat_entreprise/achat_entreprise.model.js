const connection = require('../_db/database');

class AchatEntreprise {
  constructor(bonCommande, quantiteAchetee, montant, banque, cheque, bordereau, dateAchat) {
    this.bonCommande = bonCommande;
    this.quantiteAchetee = quantiteAchetee;
    this.montant = montant;
    this.banque = banque;
    this.cheque = cheque;
    this.bordereau = bordereau;
    this.dateAchat = dateAchat;
  }

  static create(achatEntrepriseData, callback) {
    const query = 'INSERT INTO achat_entreprise (bon_commande, quantite_achetee, montant, banque, cheque, bordereau, date_achat) VALUES (?,?,?,?,?,?,?)';
    const currentDate = new Date();
    connection.query(query, [achatEntrepriseData.bonCommande, achatEntrepriseData.quantiteAchetee, achatEntrepriseData.montant, achatEntrepriseData.banque, achatEntrepriseData.cheque, achatEntrepriseData.bordereau, currentDate], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newAchatEntreprise = new AchatEntreprise(...Object.values(achatEntrepriseData), currentDate);
      return callback(null, newAchatEntreprise);
    });
  }

  static getByBonCommande(bonCommande, callback) {
    const query = 'SELECT * FROM achat_entreprise WHERE bon_commande = ?';
    connection.query(query, [bonCommande], (error, results) => {
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
    const query = 'SELECT * FROM achat_entreprise';
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
    const query = 'UPDATE achat_entreprise SET quantite_achetee = ?, montant = ?, banque = ?, cheque = ?, bordereau = ?, date_achat = ? WHERE bon_commande = ?';
    const { bonCommande, ...updatedData } = this;
    connection.query(query, [updatedData.quantiteAchetee, updatedData.montant, updatedData.banque, updatedData.cheque, updatedData.bordereau, updatedData.dateAchat, bonCommande], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteByBonCommande(bonCommande, callback) {
    const query = 'DELETE FROM achat_entreprise WHERE bon_commande = ?';
    connection.query(query, [bonCommande], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = AchatEntreprise;
