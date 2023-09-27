const connection = require('../_db/database');

// Modèle de données pour la table stock_camion
class StockCamion {
  constructor(id, numeroCamion, categorie, numeroChauffeur, numeroBc, quantite, dateApprovisionnement) {
    this.id = id;
    this.numeroCamion = numeroCamion;
    this.categorie = categorie;
    this.numeroChauffeur = numeroChauffeur;
    this.numeroBc = numeroBc;
    this.quantite = quantite;
    this.dateApprovisionnement = dateApprovisionnement;
  }

  // Méthode pour créer une nouvelle entrée de stock camion
  static create(stockCamionData, callback) {
    const query = 'INSERT INTO stock_camion SET ?';
    connection.query(query, stockCamionData, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newStockCamion = new StockCamion(results.insertId, ...Object.values(stockCamionData));
      return callback(null, newStockCamion);
    });
  }

  // Méthode pour récupérer une entrée de stock camion par ID
  static getById(id, callback) {
    const query = 'SELECT * FROM stock_camion WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Entrée de stock camion non trouvée
      }
      const stockCamionData = results[0];
      const stockCamion = new StockCamion(
        stockCamionData.id,
        stockCamionData.numero_camion,
        stockCamionData.categorie,
        stockCamionData.numero_chauffeur,
        stockCamionData.numero_bc,
        stockCamionData.quantite,
        stockCamionData.date_approvisionnement
      );
      return callback(null, stockCamion);
    });
  }

  // Méthode pour récupérer toutes les entrées de la table stock_camion
 static getAll(callback) {
  const query = 'SELECT * FROM stock_camion';
  connection.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const stocksCamion = results.map((stockData) => {
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
    return callback(null, stocksCamion);
  });
}

  // Méthode pour mettre à jour une entrée de stock camion
  update(callback) {
    const query = 'UPDATE stock_camion SET ? WHERE id = ?';
    const { id, ...stockCamionData } = this;
    connection.query(query, [stockCamionData, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Méthode pour supprimer une entrée de stock camion
  delete(callback) {
    const query = 'DELETE FROM stock_camion WHERE id = ?';
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  // Autres méthodes pour effectuer des opérations CRUD sur la table stock_camion
}

module.exports = StockCamion;
