const connection = require("../_db/database");

class AchatClient {
  constructor(
    id,
    quantite_achetee,
    categorie,
    montant,
    numero_ctp,
    bordereau,
    numero_bc,
    id_client,
    date_achat
  ) {
    this.id = id;
    this.quantite_achetee = quantite_achetee;
    this.categorie = categorie;
    this.montant = montant;
    this.numero_ctp = numero_ctp;
    this.bordereau = bordereau;
    this.numero_bc = numero_bc;
    this.id_client = id_client;
    this.date_achat = date_achat;
  }

  static create(achatClientData, callback) {
    const query =
      "INSERT INTO achat_client (id, quantite_achetee, categorie, montant, numero_ctp, bordereau, numero_bc, id_client, date_achat) VALUES (NULL,?,?,?,?,?,?,?,?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        achatClientData.quantite_achetee,
        achatClientData.categorie,
        achatClientData.montant,
        achatClientData.numero_ctp,
        achatClientData.bordereau,
        achatClientData.numero_bc,
        achatClientData.id_client,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newAchatClient = new AchatClient(
          results.insertId,
          ...Object.values(achatClientData),
          currentDate
        );
        return callback(null, newAchatClient);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM achat_client WHERE id = ?";
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
        new Date(achatClientData.date_achat)
      );
      return callback(null, achatClient);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM achat_client";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const achatsClients = results.map((achatClientData) => {
        return new AchatClient(
          achatClientData.id,
          achatClientData.quantite_achetee,
          achatClientData.categorie,
          achatClientData.montant,
          achatClientData.numero_ctp,
          achatClientData.bordereau,
          achatClientData.numero_bc,
          achatClientData.id_client,
          new Date(achatClientData.date_achat)
        );
      });
      return callback(null, achatsClients);
    });
  }

  static getAllOfClient(id_client, callback) {
    const query = "SELECT * FROM achat_client WHERE id_client = ?";
    connection.query(query, [id_client], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const achatsClients = results.map((achatClientData) => {
        // console.log(typeof achatClientData.quantite_achetee);
        return new AchatClient(
          achatClientData.id,
          achatClientData.quantite_achetee,
          achatClientData.categorie,
          achatClientData.montant,
          achatClientData.numero_ctp,
          achatClientData.bordereau,
          achatClientData.numero_bc,
          achatClientData.id_client,
          new Date(achatClientData.date_achat)
        );
      });
      return callback(null, achatsClients);
    });
  }

  update(callback) {
    const query =
      "UPDATE achat_client SET quantite_achetee = ?, categorie = ?, montant = ?, numero_ctp = ?, bordereau = ?, numero_bc = ?, id_client = ?, date_achat = ? WHERE achat_client.id = ?";
    const { id, ...achatClientData } = this;
    connection.query(
      query,
      [
        achatClientData.quantite_achetee,
        achatClientData.categorie,
        achatClientData.montant,
        achatClientData.numero_ctp,
        achatClientData.bordereau,
        achatClientData.numero_bc,
        achatClientData.id_client,
        new Date(achatClientData.date_achat),
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
    const query = "DELETE FROM achat_client WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = AchatClient;
