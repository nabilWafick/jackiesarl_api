const connection = require('../_db/database');

class StockBonCommande {
  constructor(id, numeroBc, categorie, quantiteAchetee, stockAvantVente, vente, stockApresVente, dateRechargement) {
    this.id = id;
    this.numeroBc = numeroBc;
    this.categorie = categorie;
    this.quantiteAchetee = quantiteAchetee;
    this.stockAvantVente = stockAvantVente;
    this.vente = vente;
    this.stockApresVente = stockApresVente;
    this.dateRechargement = dateRechargement;
  }

  static create(stockBonCommandeData, callback) {
    const query = 'INSERT INTO stock_bon_commande SET ?';
    connection.query(query, stockBonCommandeData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newStockBonCommande = new StockBonCommande(results.insertId, ...Object.values(stockBonCommandeData));
      return callback(null, newStockBonCommande);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM stock_bon_commande WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const stockBonCommandeData = results[0];
      const stockBonCommande = new StockBonCommande(
        stockBonCommandeData.id,
        stockBonCommandeData.numero_bc,
        stockBonCommandeData.categorie,
        stockBonCommandeData.quantite_achetee,
        stockBonCommandeData.stock_avant_vente,
        stockBonCommandeData.vente,
        stockBonCommandeData.stock_apres_vente,
        stockBonCommandeData.date_rechargement
      );
      return callback(null, stockBonCommande);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table stock_bon_commande
static getAll(callback) {
  const query = 'SELECT * FROM stock_bon_commande';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const stocksBonCommande = results.map((stockData) => {
      return new StockBonCommande(
        stockData.id,
        stockData.numero_bc,
        stockData.categorie,
        stockData.quantite_achetee,
        stockData.stock_avant_vente,
        stockData.vente,
        stockData.stock_apres_vente,
        stockData.date_rechargement
      );
    });
    return callback(null, stocksBonCommande);
  });
}


  update(callback) {
    const query = 'UPDATE stock_bon_commande SET ? WHERE id = ?';
    const { id, ...stockBonCommandeData } = this;
    connection.query(query, [stockBonCommandeData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  delete(callback) {
    const query = 'DELETE FROM stock_bon_commande WHERE id = ?';
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = StockBonCommande;
