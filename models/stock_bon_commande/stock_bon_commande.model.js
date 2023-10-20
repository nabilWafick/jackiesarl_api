const connection = require("../_db/database");

class StockBonCommande {
  constructor(
    id,
    numero_bc,
    categorie,
    quantite_achetee,
    stock_initial,
    stock_avant_vente,
    vente,
    stock_apres_vente,
    date_rechargement
  ) {
    this.id = id;
    this.numero_bc = numero_bc;
    this.categorie = categorie;
    this.quantite_achetee = quantite_achetee;
    (this.stock_initial = stock_initial),
      (this.stock_avant_vente = stock_avant_vente);
    this.vente = vente;
    this.stock_apres_vente = stock_apres_vente;
    this.date_rechargement = date_rechargement;
  }

  static create(stockData, callback) {
    const query =
      "INSERT INTO stock_bon_commande (id, numero_bc, categorie, quantite_achetee, stock_initial,stock_avant_vente, vente, stock_apres_vente, date_rechargement) VALUES (NULL, ?, ?,?, ?, ?, ?, ?, ?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        stockData.numero_bc,
        stockData.categorie,
        stockData.quantite_achetee,
        stockData.stock_initial,
        stockData.stock_avant_vente,
        stockData.vente,
        stockData.stock_apres_vente,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newStock = new StockBonCommande(
          results.insertId,
          ...Object.values(stockData),
          currentDate
        );
        return callback(null, newStock);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM stock_bon_commande WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Stock de bon de commande non trouvé
      }
      const stockData = results[0];
      const stock = new StockBonCommande(
        stockData.id,
        stockData.numero_bc,
        stockData.categorie,
        stockData.quantite_achetee,
        stockData.stock_initial,
        stockData.stock_avant_vente,
        stockData.vente,
        stockData.stock_apres_vente,
        stockData.date_rechargement
      );
      return callback(null, stock);
    });
  }

  static getLastBonCommande(bon_commande, callback) {
    const query =
      "SELECT * FROM stock_bon_commande WHERE numero_bc = ? ORDER BY id DESC LIMIT 1";
    connection.query(query, [bon_commande], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Stock de bon de commande non trouvé
      }
      const stockData = results[0];
      const stock = new StockBonCommande(
        stockData.id,
        stockData.numero_bc,
        stockData.categorie,
        stockData.quantite_achetee,
        stockData.stock_initial,
        stockData.stock_avant_vente,
        stockData.vente,
        stockData.stock_apres_vente,
        stockData.date_rechargement
      );
      return callback(null, stock);
    });
  }

  static getByBonCommande(numero_bc, callback) {
    const query =
      "SELECT numero_bc, categorie, quantite_achetee, SUM(stock_initial) AS stock_initial, SUM(stock_avant_vente) AS stock_avant_vente ,SUM(vente) AS vente, SUM(stock_apres_vente) AS stock_apres_vente  FROM stock_bon_commande WHERE numero_bc = ?";
    connection.query(query, [numero_bc], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Stock de bon de commande non trouvé
      }

      const stockData = results[0];

      const stock = new StockBonCommande(
        stockData.id,
        stockData.numero_bc,
        stockData.categorie,
        stockData.quantite_achetee,
        stockData.stock_initial,
        stockData.stock_avant_vente,
        stockData.vente,
        stockData.stock_apres_vente,
        stockData.date_rechargement
      );
      return callback(null, stock);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM stock_bon_commande ORDER BY numero_bc";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const stocksList = results.map((stockData) => {
        return new StockBonCommande(
          stockData.id,
          stockData.numero_bc,
          stockData.categorie,
          stockData.quantite_achetee,
          stockData.stock_initial,
          stockData.stock_avant_vente,
          stockData.vente,
          stockData.stock_apres_vente,
          stockData.date_rechargement
        );
      });
      return callback(null, stocksList);
    });
  }

  update(callback) {
    const query =
      "UPDATE stock_bon_commande SET numero_bc = ?, categorie = ?, quantite_achetee = ?, stock_avant_vente = ?, vente = ?, stock_apres_vente = ?, date_rechargement = ? WHERE id = ?";
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
    const query = "DELETE FROM stock_bon_commande WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = StockBonCommande;
