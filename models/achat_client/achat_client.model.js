const connection = require('../_db/database')

// Modèle de données pour la table achat_client
class AchatClient {
  constructor(id, quantiteAchetee, categorie, montant, numeroCtp, bordereau, numeroBc, idClient, dateAchat) {
    this.id = id;
    this.quantiteAchetee = quantiteAchetee;
    this.categorie = categorie;
    this.montant = montant;
    this.numeroCtp = numeroCtp;
    this.bordereau = bordereau;
    this.numeroBc = numeroBc;
    this.idClient = idClient;
    this.dateAchat = dateAchat;
  }

  // Méthode pour créer un nouvel achat client
  static create(achatClientData, callback) {
    const query = 'INSERT INTO achat_client SET ?';
    connection.query(query, achatClientData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newAchatClient = new AchatClient(results.insertId, ...Object.values(achatClientData));
      return callback(null, newAchatClient);
    });
  }

  // Méthode pour récupérer un achat client par ID
  static getById(id, callback) {
    const query = 'SELECT * FROM achat_client WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }

      if (results.length === 0) {
        return callback(null, null); // Achat client non trouvé
      }
      const achatClientData = results[0];
      const achatClient = new AchatClient(
        achatClientData.id,
        achatClientData.quantite_achetee,
        achatClientData.categorie,
        achatClientData.montant,
        achatClientData.numero_ctp,
        achatClientData.bordereau,
        achatClientData.numero_bc,
        achatClientData.id_client,
        achatClientData.date_achat
      );
      return callback(null, achatClient);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table achat_entreprise
  static getAll(callback) {
  const query = 'SELECT * FROM achat_entreprise';
  connection.query(query, (error, results) => {
     
    if (error) {
      return callback(error, null);
    }
    getById
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


  // Méthode pour mettre à jour un achat client
  update(callback) {
    const query = 'UPDATE achat_client SET ? WHERE id = ?';
    const { id, ...achatClientData } = this;
    connection.query(query, [achatClientData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Méthode pour supprimer un achat client
  delete(callback) {
    const query = 'DELETE FROM achat_client WHERE id = ?';
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Autres méthodes pour effectuer des opérations CRUD sur la table achat_client
}

module.exports = AchatClient;
