const connection = require("../_db/database");

class Clients {
  constructor(
    id,
    nom,
    prenoms,
    numero_ifu,
    numero_telephone,
    email,
    date_ajout
  ) {
    this.id = id;
    this.nom = nom;
    this.prenoms = prenoms;
    this.numero_ifu = numero_ifu;
    this.numero_telephone = numero_telephone;
    this.email = email;
    this.date_ajout = date_ajout;
  }

  static create(clientData, callback) {
    const query =
      "INSERT INTO clients (id, nom, prenoms, numero_ifu, numero_telephone, email, date_ajout) VALUES (NULL,?,?,?,?,?,?)";
    const currentDate = new Date();
    console.log("Current date");
    console.log(currentDate);
    connection.query(
      query,
      [
        clientData.nom,
        clientData.prenoms,
        clientData.numero_ifu,
        clientData.numero_telephone,
        clientData.email,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newClient = new Clients(
          results.insertId,
          ...Object.values(clientData),
          currentDate
        );
        return callback(null, newClient);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM clients WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Client non trouvé
      }
      const clientData = results[0];
      const client = new Clients(
        clientData.id,
        clientData.nom,
        clientData.prenoms,
        clientData.numero_ifu,
        clientData.numero_telephone,
        clientData.email,
        clientData.date_ajout
      );
      return callback(null, client);
    });
  }

  static getAllMatched(name, callback) {
    const query = `SELECT * FROM clients WHERE nom LIKE '%${name}' or nom LIKE '${name}%' or nom LIKE '%${name}%' or prenoms LIKE '%${name}' or prenoms LIKE '${name}%' or prenoms LIKE '%${name}%'`;
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }

      const clients = results.map((clientData) => {
        return new Clients(
          clientData.id,
          clientData.nom,
          clientData.prenoms,
          clientData.numero_ifu,
          clientData.numero_telephone,
          clientData.email,
          clientData.date_ajout
        );
      });
      return callback(null, clients);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table clients
  static getAll(callback) {
    const query = "SELECT * FROM clients";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const clients = results.map((clientData) => {
        return new Clients(
          clientData.id,
          clientData.nom,
          clientData.prenoms,
          clientData.numero_ifu,
          clientData.numero_telephone,
          clientData.email,
          clientData.date_ajout
        );
      });
      return callback(null, clients);
    });
  }

  update(callback) {
    const query =
      "UPDATE clients SET nom = ?, prenoms = ?, numero_ifu = ?, numero_telephone = ?, email = ?, date_ajout = ? WHERE clients.id = ?";
    const { id, ...clientData } = this;
    connection.query(
      query,
      [
        clientData.nom,
        clientData.prenoms,
        clientData.numero_ifu,
        clientData.numero_telephone,
        clientData.email,
        new Date(clientData.date_ajout),
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
    const query = "DELETE FROM clients WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Clients;
