const connection = require("../_db/database");

class PaiementClient {
  constructor(
    id,
    montant,
    banque,
    reference,
    categorie,
    numero_bc,
    bordereau,
    est_valide,
    id_client,
    date_paiement
  ) {
    this.id = id;
    this.montant = montant;
    this.banque = banque;
    this.reference = reference;
    this.categorie = categorie;
    this.numero_bc = numero_bc;
    this.bordereau = bordereau;
    this.est_valide = est_valide;
    this.id_client = id_client;
    this.date_paiement = date_paiement;
  }

  static create(paiementData, callback) {
    const query =
      "INSERT INTO paiement_client (id, montant, banque, reference, categorie, numero_bc, bordereau, est_valide, id_client, date_paiement) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        paiementData.montant,
        paiementData.banque,
        paiementData.reference,
        paiementData.categorie,
        paiementData.numero_bc,
        paiementData.bordereau,
        paiementData.est_valide,
        paiementData.id_client,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newPaiement = new PaiementClient(
          results.insertId,
          ...Object.values(paiementData),
          currentDate
        );
        return callback(null, newPaiement);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM paiement_client WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Paiement client non trouvé
      }
      const paiementData = results[0];
      const paiement = new PaiementClient(
        paiementData.id,
        paiementData.montant,
        paiementData.banque,
        paiementData.reference,
        paiementData.categorie,
        paiementData.numero_bc,
        paiementData.bordereau,
        paiementData.est_valide,
        paiementData.id_client,
        paiementData.date_paiement
      );
      return callback(null, paiement);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM paiement_client";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const paiementsList = results.map((paiementData) => {
        return new PaiementClient(
          paiementData.id,
          paiementData.montant,
          paiementData.banque,
          paiementData.reference,
          paiementData.categorie,
          paiementData.numero_bc,
          paiementData.bordereau,
          paiementData.est_valide,
          paiementData.id_client,
          paiementData.date_paiement
        );
      });
      return callback(null, paiementsList);
    });
  }

  static getAllOfClient(id_client, callback) {
    const query = "SELECT * FROM paiement_client WHERE id_client = ?";
    connection.query(query, [id_client], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const paiementsList = results.map((paiementData) => {
        // console.log(typeof PaiementClientData.quantite_achetee);
        return new PaiementClient(
          paiementData.id,
          paiementData.montant,
          paiementData.banque,
          paiementData.reference,
          paiementData.categorie,
          paiementData.numero_bc,
          paiementData.bordereau,
          paiementData.est_valide,
          paiementData.id_client,
          paiementData.date_paiement
        );
      });
      return callback(null, paiementsList);
    });
  }

  update(callback) {
    const query =
      "UPDATE paiement_client SET montant = ?, banque = ?, reference = ?, categorie = ?, numero_bc = ?, bordereau = ?, est_valide = ?, id_client = ?, date_paiement = ? WHERE id = ?";
    const { id, ...updatedData } = this;
    connection.query(
      query,
      [...Object.values(updatedData), id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null);
      }
    );
  }

  static delete(id, callback) {
    const query = "DELETE FROM paiement_client WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = PaiementClient;
