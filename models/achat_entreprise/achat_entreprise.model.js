const connection = require('../_db/database');

// Modèle de données pour la table achat_entreprise
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

  // Méthode pour créer un nouvel achat entreprise
  static create(achatEntrepriseData, callback) {
    const query = 'INSERT INTO achat_entreprise SET ?';
    connection.query(query, achatEntrepriseData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newAchatEntreprise = new AchatEntreprise(results.insertId, ...Object.values(achatEntrepriseData));
      return callback(null, newAchatEntreprise);
    });
  }

  // Méthode pour récupérer un achat entreprise par bon de commande
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
        achatEntrepriseData.date_achat
      );
      return callback(null, achatEntreprise);
    });
  }


  
 // Méthode pour récupérer toutes les entrées de la table achat_entreprise
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
        achatEntrepriseData.date_achat
      );
    });
    return callback(null, achatsEntreprise);
  });
}

  // Méthode pour mettre à jour un achat entreprise
  update(callback) {
    const query = 'UPDATE achat_entreprise SET ? WHERE bon_commande = ?';
    const { bonCommande, ...achatEntrepriseData } = this;
    connection.query(query, [achatEntrepriseData, bonCommande], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Méthode pour supprimer un achat entreprise par bon de commande
  static deleteByBonCommande(bonCommande, callback) {
    const query = 'DELETE FROM achat_entreprise WHERE bon_commande = ?';
    connection.query(query, [bonCommande], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Autres méthodes pour effectuer des opérations CRUD sur la table achat_entreprise
}

module.exports = AchatEntreprise;
