const connection = require('../_db/database');

class StockBonCommande {
  constructor(id, numero_bc, categorie, quantite_achetee, stock_avant_vente, vente, stock_apres_vente, date_rechargement) {
    this.id = id;
    this.numero_bc = numero_bc;
    this.categorie = categorie;
    this.quantite_achetee = quantite_achetee;
    this.stock_avant_vente = stock_avant_vente;
    this.vente = vente;
    this.stock_apres_vente = stock_apres_vente;
    this.date_rechargement = date_rechargement;
  }

  static create(stockData, callback) {
    const query = 'INSERT INTO stock_bon_commande (id, numero_bc, categorie, quantite_achetee, stock_avant_vente, vente, stock_apres_vente, date_rechargement) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [stockData.numero_bc, stockData.categorie, stockData.quantite_achetee, stockData.stock_avant_vente, stockData.vente, stockData.stock_apres_vente, stockData.date_rechargement], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newStock = new StockBonCommande(results.insertId, ...Object.values(stockData));
      return callback(null, newStock);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM stock_bon_commande WHERE id = ?';
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
        stockData.stock_avant_vente,
        stockData.vente,
        stockData.stock_apres_vente,
        stockData.date_rechargement,
      );
      return callback(null, stock);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM stock_bon_commande';
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
          stockData.stock_avant_vente,
          stockData.vente,
          stockData.stock_apres_vente,
          stockData.date_rechargement,
        );
      });
      return callback(null, stocksList);
    });
  }

  update(callback) {
    const query = 'UPDATE stock_bon_commande SET numero_bc = ?, categorie = ?, quantite_achetee = ?, stock_avant_vente = ?, vente = ?, stock_apres_vente = ?, date_rechargement = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [...Object.values(updatedData), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM stock_bon_commande WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = StockBonCommande;
