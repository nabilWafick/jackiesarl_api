const connection = require('../_db/database');

class Clients {
  constructor(id, nomComplet, numeroIfu, numeroTelephone, email) {
    this.id = id;
    this.nomComplet = nomComplet;
    this.numeroIfu = numeroIfu;
    this.numeroTelephone = numeroTelephone;
    this.email = email;
  }

  static create(clientData, callback) {
    const query = 'INSERT INTO clients SET ?';
    connection.query(query, clientData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newClient = new Clients(results.insertId, ...Object.values(clientData));
      return callback(null, newClient);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM clients WHERE id = ?';
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
        clientData.nom_complet,
        clientData.numero_ifu,
        clientData.numero_telephone,
        clientData.email
      );
      return callback(null, client);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table clients
static getAll(callback) {
  const query = 'SELECT * FROM clients';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const clients = results.map((clientData) => {
      return new Clients(
        clientData.id,
        clientData.nom_complet,
        clientData.numero_ifu,
        clientData.numero_telephone,
        clientData.email
      );
    });
    return callback(null, clients);
  });
}



  update(callback) {
    const query = 'UPDATE clients SET ? WHERE id = ?';
    const { id, ...clientData } = this;
    connection.query(query, [clientData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM clients WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Clients;
