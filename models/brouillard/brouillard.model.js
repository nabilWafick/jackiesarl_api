const connection = require("../_db/database");

class Brouillard {
  constructor(id, depot, stock_actuel, nom_gerant, numero_gerant, date_ajout) {
    this.id = id;
    this.depot = depot;
    this.stock_actuel = stock_actuel;
    this.nom_gerant = nom_gerant;
    this.numero_gerant = numero_gerant;
    this.date_ajout = date_ajout;
  }

  static create(brouillardData, callback) {
    const query =
      "INSERT INTO brouillard (depot, stock_actuel, nom_gerant, numero_gerant, date_ajout) VALUES (?, ?, ?, ?, ?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        brouillardData.depot,
        brouillardData.stock_actuel,
        brouillardData.nom_gerant,
        brouillardData.numero_gerant,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newBrouillard = new Brouillard(
          results.insertId,
          brouillardData.depot,
          brouillardData.stock_actuel,
          brouillardData.nom_gerant,
          brouillardData.numero_gerant,
          currentDate
        );
        return callback(null, newBrouillard);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM brouillard WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Brouillard non trouvé
      }
      const brouillardData = results[0];
      const brouillard = new Brouillard(
        brouillardData.id,
        brouillardData.depot,
        brouillardData.stock_actuel,
        brouillardData.nom_gerant,
        brouillardData.numero_gerant,
        new Date(brouillardData.date_ajout)
      );
      return callback(null, brouillard);
    });
  }

  static getAll(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM brouillard WHERE date_ajout BETWEEN ? AND ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const brouillardList = results.map((brouillardData) => {
            return new Brouillard(
              brouillardData.id,
              brouillardData.depot,
              brouillardData.stock_actuel,
              brouillardData.nom_gerant,
              brouillardData.numero_gerant,
              new Date(brouillardData.date_ajout)
            );
          });
          return callback(null, brouillardList);
        }
      );
    } else {
      const query = "SELECT * FROM brouillard ORDER BY id DESC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const brouillardList = results.map((brouillardData) => {
          return new Brouillard(
            brouillardData.id,
            brouillardData.depot,
            brouillardData.stock_actuel,
            brouillardData.nom_gerant,
            brouillardData.numero_gerant,
            new Date(brouillardData.date_ajout)
          );
        });
        return callback(null, brouillardList);
      });
    }
  }

  update(callback) {
    const query =
      "UPDATE brouillard SET depot = ?, stock_actuel = ?, nom_gerant = ?, numero_gerant = ?, date_ajout = ? WHERE id = ?";
    const { id, ...updatedData } = this;
    connection.query(
      query,
      [
        updatedData.depot,
        updatedData.stock_actuel,
        updatedData.nom_gerant,
        updatedData.numero_gerant,
        new Date(updatedData.date_ajout),
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
    const query = "DELETE FROM brouillard WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = Brouillard;
