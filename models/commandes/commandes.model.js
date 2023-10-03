const connection = require('../_db/database');

class Commandes {
  constructor(id, categorie, quantite_achetee, destination, date_commande, date_livraison, est_traitee, id_client, date_ajout) {
    this.id = id;
    this.categorie = categorie;
    this.quantite_achetee = quantite_achetee;
    this.destination = destination;
    this.date_commande = date_commande;
    this.date_livraison = date_livraison;
    this.est_traitee = est_traitee;
    this.id_client = id_client;
    this.date_ajout = date_ajout;
  }

  static create(commandeData, callback) {
    const query = 'INSERT INTO commandes (id, categorie, quantite_achetee, destination, date_commande, date_livraison, est_traitee, id_client, date_ajout) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)';
    const currentDate = new Date();
    connection.query(query, [commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, currentDate], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newCommande = new Commandes(results.insertId, ...Object.values(commandeData), currentDate);
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
        commandeData.id_client,
        commandeData.date_ajout,
      );
      return callback(null, commande);
    });
  }

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
          commandeData.id_client,
          commandeData.date_ajout,
        );
      });
      return callback(null, commandes);
    });
  }

  update(callback) {
    const query = 'UPDATE commandes SET categorie = ?, quantite_achetee = ?, destination = ?, date_commande = ?, date_livraison = ?, est_traitee = ?, id_client = ?, date_ajout = ? WHERE id = ?';
    const { id, ...commandeData } = this;
    connection.query(query, [...Object.values(commandeData), id], (error, results) => {
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
