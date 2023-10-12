const connection = require("../_db/database");

class StockCamion {
  constructor(
    id,
    numero_camion,
    categorie,
    numero_chauffeur,
    numero_bc,
    quantite,
    date_approvisionnement
  ) {
    this.id = id;
    this.numero_camion = numero_camion;
    this.categorie = categorie;
    this.numero_chauffeur = numero_chauffeur;
    this.numero_bc = numero_bc;
    this.quantite = quantite;
    this.date_approvisionnement = date_approvisionnement;
  }

  static create(stockData, callback) {
    const query =
      "INSERT INTO stock_camion (id, numero_camion, categorie, numero_chauffeur, numero_bc, quantite, date_approvisionnement) VALUES (NULL, ?, ?, ?, ?, ?, ?)";

    const currentDate = new Date();

    connection.query(
      query,
      [
        stockData.numero_camion,
        stockData.categorie,
        stockData.numero_chauffeur,
        stockData.numero_bc,
        stockData.quantite,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newStock = new StockCamion(
          results.insertId,
          ...Object.values(stockData),
          currentDate
        );
        return callback(null, newStock);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM stock_camion WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Stock de camion non trouvé
      }
      const stockData = results[0];
      const stock = new StockCamion(
        stockData.id,
        stockData.numero_camion,
        stockData.categorie,
        stockData.numero_chauffeur,
        stockData.numero_bc,
        stockData.quantite,
        stockData.date_approvisionnement
      );
      return callback(null, stock);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM stock_camion";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const stocksList = results.map((stockData) => {
        return new StockCamion(
          stockData.id,
          stockData.numero_camion,
          stockData.categorie,
          stockData.numero_chauffeur,
          stockData.numero_bc,
          stockData.quantite,
          stockData.date_approvisionnement
        );
      });
      return callback(null, stocksList);
    });
  }

  update(callback) {
    const query =
      "UPDATE stock_camion SET numero_camion = ?, categorie = ?, numero_chauffeur = ?, numero_bc = ?, quantite = ?, date_approvisionnement = ? WHERE id = ?";
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
    const query = "DELETE FROM stock_camion WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = StockCamion;
