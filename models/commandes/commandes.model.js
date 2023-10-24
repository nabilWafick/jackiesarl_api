const connection = require("../_db/database");

const Clients = require("../clients/clients.model");
class Commandes {
  constructor(
    id,
    client,
    categorie,
    quantite_achetee,
    destination,
    date_commande,
    date_livraison,
    est_traitee,
    id_client,
    date_ajout
  ) {
    this.id = id;
    this.client = client;
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
    const query =
      "INSERT INTO commandes (id, categorie, quantite_achetee, destination, date_commande, date_livraison, est_traitee, id_client, date_ajout) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        commandeData.categorie,
        commandeData.quantite_achetee,
        commandeData.destination,
        new Date(commandeData.date_commande),
        new Date(commandeData.date_livraison),
        commandeData.est_traitee,
        commandeData.id_client,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newCommande = new Commandes(
          results.insertId,
          undefined,
          ...Object.values(commandeData)
          //currentDate
        );
        return callback(null, newCommande);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM commandes WHERE id = ?";
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
        undefined,
        commandeData.categorie,
        commandeData.quantite_achetee,
        commandeData.destination,
        commandeData.date_commande,
        commandeData.date_livraison,
        commandeData.est_traitee,
        commandeData.id_client,
        commandeData.date_ajout
      );
      return callback(null, commande);
    });
  }

  static getAll(callback) {
    const query = `SELECT
    clients.id AS id_client,
    clients.nom,
    clients.prenoms,
    clients.numero_ifu,
    clients.numero_telephone,
    clients.email,
    clients.date_ajout AS date_ajout_client,
    commandes.id AS id_commande,
    commandes.categorie,
    commandes.quantite_achetee,
    commandes.destination,
    commandes.date_commande,
    commandes.date_livraison,
    commandes.est_traitee,
    commandes.id_client,
    commandes.date_ajout
FROM
    clients, commandes 
WHERE
    clients.id = commandes.id_client;`;
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const commandes = results.map((commandeData) => {
        return new Commandes(
          commandeData.id_commande,
          new Clients(
            commandeData.id_client,
            commandeData.nom,
            commandeData.prenoms,
            commandeData.numero_ifu,
            commandeData.numero_telephone,
            commandeData.email,
            commandeData.date_ajout_client
          ),
          commandeData.categorie,
          commandeData.quantite_achetee,
          commandeData.destination,
          commandeData.date_commande,
          commandeData.date_livraison,
          commandeData.est_traitee,
          commandeData.id_client,
          commandeData.date_ajout
        );
      });
      return callback(null, commandes);
    });
  }

  update(callback) {
    const query =
      "UPDATE commandes SET categorie = ?, quantite_achetee = ?, destination = ?, date_commande = ?, date_livraison = ?, est_traitee = ?, id_client = ?, date_ajout = ? WHERE id = ?";
    const { id, ...commandeData } = this;
    connection.query(
      query,
      [
        commandeData.categorie,
        commandeData.quantite_achetee,
        commandeData.destination,
        new Date(commandeData.date_commande),
        new Date(commandeData.date_livraison),
        commandeData.est_traitee,
        commandeData.id_client,
        new Date(commandeData.date_ajout),
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
    const query = "DELETE FROM commandes WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = Commandes;
