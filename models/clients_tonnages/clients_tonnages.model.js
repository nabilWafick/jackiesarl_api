const connection = require("../_db/database");
const Clients = require("../../models/clients/clients.model");

class ClientsTonnages {
  constructor(client, tonnage_CIMBENIN, tonnage_NOCIBE, pourcentage_achat) {
    this.client = client;
    this.tonnage_CIMBENIN = tonnage_CIMBENIN;
    this.tonnage_NOCIBE = tonnage_NOCIBE;
    this.pourcentage_achat = pourcentage_achat;
  }

  static getByIdClient(id_client, callback) {
    const query = `SELECT clients.id,clients.nom,clients.prenoms,clients.numero_ifu,clients.numero_telephone,clients.email,clients.date_ajout,
    SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END) AS "tonnage_CIMBENIN",
           SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END) AS "tonnage_NOCIBE",
           (SUM(CASE WHEN categorie = 'CIM BENIN' OR categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END) / (SELECT SUM(quantite_achetee) FROM achat_client)) * 100 AS "pourcentage_achat"
    FROM achat_client,clients
    WHERE id_client = clients.id AND id_client = ?
    GROUP BY id_client;`;
    connection.query(query, [id_client], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Client par tonnage  non trouvé
      }
      const clientTonnages = results[0];
      const clientPurchasingTonnage = new ClientsTonnages(
        new Clients(
          clientTonnages.id,
          clientTonnages.nom,
          clientTonnages.prenoms,
          clientTonnages.numero_ifu,
          clientTonnages.numero_telephone,
          clientTonnages.email,
          clientTonnages.date_ajout
        ),
        clientTonnages.tonnage_CIMBENIN,
        clientTonnages.tonnage_NOCIBE,
        clientTonnages.pourcentage_achat
      );
      return callback(null, clientPurchasingTonnage);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table clients
  static getAll(callback) {
    const query = `SELECT clients.id,clients.nom,clients.prenoms,clients.numero_ifu,clients.numero_telephone,clients.email,clients.date_ajout,
    SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END) AS "tonnage_CIMBENIN",
           SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END) AS "tonnage_NOCIBE",
           (SUM(CASE WHEN categorie = 'CIM BENIN' OR categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END) / (SELECT SUM(quantite_achetee) FROM achat_client)) * 100 AS "pourcentage_achat"
    FROM achat_client,clients
    WHERE id_client = clients.id
    GROUP BY id_client
    ORDER BY pourcentage_achat DESC;`;
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const clientsTonnages = results.map((clientTonnages) => {
        return new ClientsTonnages(
          new Clients(
            clientTonnages.id,
            clientTonnages.nom,
            clientTonnages.prenoms,
            clientTonnages.numero_ifu,
            clientTonnages.numero_telephone,
            clientTonnages.email,
            clientTonnages.date_ajout
          ),
          clientTonnages.tonnage_CIMBENIN,
          clientTonnages.tonnage_NOCIBE,
          clientTonnages.pourcentage_achat
        );
      });
      return callback(null, clientsTonnages);
    });
  }
}

module.exports = ClientsTonnages;
