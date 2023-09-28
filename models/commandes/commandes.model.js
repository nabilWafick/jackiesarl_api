const connection = require('../_db/database');

class Commandes {
  constructor(id, categorie, quantiteAchetee, destination, dateCommande, dateLivraison, estTraitee, idClient) {
    this.id = id;
    this.categorie = categorie;
    this.quantiteAchetee = quantiteAchetee;
    this.destination = destination;
    this.dateCommande = dateCommande;
    this.dateLivraison = dateLivraison;
    this.estTraitee = estTraitee;
    this.idClient = idClient;
  }

  static create(commandeData, callback) {
    const query = 'INSERT INTO commandes SET ?';
    connection.query(query, commandeData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newCommande = new Commandes(results.insertId, ...Object.values(commandeData));
      return callback(null, newCommande);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM commandes WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Commande non trouvée
      }
      const commandeData = results[0];
      const commande = new Commandes(
        commandeData.id,
        commandeData.categorie,
        commandeData.quantite_achetee,
        commandeData.destination,
        commandeData.date_commande,
        commandeData.date_livraison,
        commandeData.est_traitee,
        commandeData.id_client
      );
      return callback(null, commande);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table commandes
static getAll(callback) {
  const query = 'SELECT * FROM commandes';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const commandes = results.map((commandeData) => {
      return new Commandes(
        commandeData.id,
        commandeData.categorie,
        commandeData.quantite_achetee,
        commandeData.destination,
        commandeData.date_commande,
        commandeData.date_livraison,
        commandeData.est_traitee,
        commandeData.id_client
      );
    });
    return callback(null, commandes);
  });
}


  update(callback) {
    const query = 'UPDATE commandes SET ? WHERE id = ?';
    const { id, ...commandeData } = this;
    connection.query(query, [commandeData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM commandes WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Commandes;
