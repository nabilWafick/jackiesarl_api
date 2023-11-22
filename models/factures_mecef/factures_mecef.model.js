const connection = require("../_db/database");
const AchatClient = require("../../models/achat_client/achat_client.model");
const Clients = require("../../models/clients/clients.model");

class FacturesMECEF {
  constructor(id, vente, reference, fichier, date_facture) {
    this.id = id;
    this.vente = vente;
    this.reference = reference;
    this.fichier = fichier;
    this.date_facture = date_facture;
  }

  static create(factureData, callback) {
    const query =
      "INSERT INTO factures_mecef (id, id_achat, reference, fichier, date_facture) VALUES (NULL, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        factureData.id_achat,
        factureData.reference,
        factureData.fichier,
        new Date(factureData.date_facture),
      ],
      (error, results) => {
        if (error) {
          console.log("SQL Error", error);
          return callback(error, null);
        }
        const newFacture = new FacturesMECEF(
          results.insertId,
          ...Object.values(factureData),
          new Date(factureData.date_facture)
        );
        return callback(null, newFacture);
      }
    );
  }

  static getById(id, callback) {
    const query = `SELECT
    clients.id AS client_id,
    clients.nom AS nom,
    clients.prenoms AS prenoms,
    clients.numero_ifu AS numero_ifu,
    clients.numero_telephone AS numero_telephone,
    clients.email AS email,
    clients.date_ajout AS date_ajout,
    achat_client.id AS achat_id,
    achat_client.quantite_achetee,
    achat_client.categorie AS categorie,
    achat_client.montant AS montant,
    achat_client.numero_ctp AS numero_ctp,
    achat_client.bordereau AS bordereau,
    achat_client.numero_bc AS numero_bc,
    achat_client.date_achat AS date_achat,
    factures_mecef.id AS facture_id,
    factures_mecef.reference AS reference_facture,
    factures_mecef.fichier AS fichier_facture,
    factures_mecef.date_facture AS date_facture
    FROM
     clients, achat_client, factures_mecef
    WHERE 
     clients.id = achat_client.id_client AND 
     achat_client.id = factures_mecef.id_achat AND factures_mecef.id = ?
    ORDER BY factures_mecef.date_facture DESC `;
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.log("SQL Error", error);
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const factureData = results[0];
      const facture_mecef = new FacturesMECEF(
        factureData.id,
        new AchatClient(
          factureData.achat_id,
          new Clients(
            factureData.client_id,
            factureData.nom,
            factureData.prenoms,
            factureData.numero_ifu,
            factureData.numero_telephone,
            factureData.email,
            factureData.date_ajout
          ),
          factureData.quantite_achetee,
          factureData.categorie,
          factureData.montant,
          factureData.numero_ctp,
          factureData.bordereau,
          factureData.numero_bc,
          factureData.id_client,
          new Date(factureData.date_achat)
        ),
        factureData.reference_facture,
        factureData.fichier_facture,
        factureData.date_facture
      );
      return callback(null, facture_mecef);
    });
  }

  static getAll(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query = `SELECT
        clients.id AS client_id,
        clients.nom AS nom,
        clients.prenoms AS prenoms,
        clients.numero_ifu AS numero_ifu,
        clients.numero_telephone AS numero_telephone,
        clients.email AS email,
        clients.date_ajout AS date_ajout,
        achat_client.id AS achat_id,
        achat_client.quantite_achetee,
        achat_client.categorie AS categorie,
        achat_client.montant AS montant,
        achat_client.numero_ctp AS numero_ctp,
        achat_client.bordereau AS bordereau,
        achat_client.numero_bc AS numero_bc,
        achat_client.date_achat AS date_achat,
        factures_mecef.id AS facture_id,
        factures_mecef.reference AS reference_facture,
        factures_mecef.fichier AS fichier_facture,
        factures_mecef.date_facture AS date_facture
        FROM clients, achat_client, factures_mecef
        WHERE factures_mecef.date_facture BETWEEN ? AND ? AND
        clients.id = achat_client.id_client AND 
        achat_client.id = factures_mecef.id_achat
        ORDER BY factures_mecef.date_facture DESC 
    `;
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const facturesList = results.map((factureData) => {
            return new FacturesMECEF(
              factureData.id,
              new AchatClient(
                factureData.achat_id,
                new Clients(
                  factureData.client_id,
                  factureData.nom,
                  factureData.prenoms,
                  factureData.numero_ifu,
                  factureData.numero_telephone,
                  factureData.email,
                  factureData.date_ajout
                ),
                factureData.quantite_achetee,
                factureData.categorie,
                factureData.montant,
                factureData.numero_ctp,
                factureData.bordereau,
                factureData.numero_bc,
                factureData.id_client,
                new Date(factureData.date_achat)
              ),
              factureData.reference_facture,
              factureData.fichier_facture,
              factureData.date_facture
            );
          });
          return callback(null, facturesList);
        }
      );
    } else {
      const query = `SELECT
      clients.id AS client_id,
      clients.nom AS nom,
      clients.prenoms AS prenoms,
      clients.numero_ifu AS numero_ifu,
      clients.numero_telephone AS numero_telephone,
      clients.email AS email,
      clients.date_ajout AS date_ajout,
      achat_client.id AS achat_id,
      achat_client.quantite_achetee,
      achat_client.categorie AS categorie,
      achat_client.montant AS montant,
      achat_client.numero_ctp AS numero_ctp,
      achat_client.bordereau AS bordereau,
      achat_client.numero_bc AS numero_bc,
      achat_client.date_achat AS date_achat,
      factures_mecef.id AS facture_id,
      factures_mecef.reference AS reference_facture,
      factures_mecef.fichier AS fichier_facture,
      factures_mecef.date_facture AS date_facture
      FROM clients, achat_client, factures_mecef
      WHERE
      clients.id = achat_client.id_client AND 
      achat_client.id = factures_mecef.id_achat
      ORDER BY factures_mecef.date_facture DESC 
  `;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const facturesList = results.map((factureData) => {
          return new FacturesMECEF(
            factureData.id,
            new AchatClient(
              factureData.achat_id,
              new Clients(
                factureData.client_id,
                factureData.nom,
                factureData.prenoms,
                factureData.numero_ifu,
                factureData.numero_telephone,
                factureData.email,
                factureData.date_ajout
              ),
              factureData.quantite_achetee,
              factureData.categorie,
              factureData.montant,
              factureData.numero_ctp,
              factureData.bordereau,
              factureData.numero_bc,
              factureData.id_client,
              new Date(factureData.date_achat)
            ),
            factureData.reference_facture,
            factureData.fichier_facture,
            factureData.date_facture
          );
        });
        return callback(null, facturesList);
      });
    }
  }

  update(callback) {
    const query =
      "UPDATE factures_mecef SET id_achat = ?, reference = ?, fichier = ?, date_facture = ? WHERE factures_mecef.id = ?";
    const { id, ...factureData } = this;
    connection.query(
      query,
      [
        factureData.id_achat,
        factureData.reference,
        factureData.fichier,
        new Date(factureData.date_facture),
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
    const query = "DELETE FROM factures_mecef WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = FacturesMECEF;
