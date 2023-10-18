const StockBonCommande = require("../../models/stock_bon_commande/stock_bon_commande.model");

class StockBonCommandeController {
  // Créer un nouveau stock bon de commande
  static create = (req, res) => {
    const stockBonCommandeData = req.body;
    StockBonCommande.create(stockBonCommandeData, (error, stockBonCommande) => {
      if (error) {
        return res
          .status(500)
          .json({
            status: 500,
            error: "Erreur lors de la création du stock bon de commande",
          });
      }
      return res.status(201).json({ status: 201, stockBonCommande });
    });
  };

  // Récupérer un stock bon de commande par ID
  static getById = (req, res) => {
    const id = req.params.id;
    StockBonCommande.getById(id, (error, stockBonCommande) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération du stock bon de commande",
        });
      }
      if (!stockBonCommande) {
        return res
          .status(404)
          .json({ error: "Stock bon de commande non trouvé" });
      }
      return res.status(200).json(stockBonCommande);
    });
  };

  static getAll = (req, res) => {
    StockBonCommande.getAll((error, stockBonCommandes) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des stocks de bon de commande",
        });
      }
      return res.status(200).json(stockBonCommandes);
    });
  };

  // Mettre à jour un stock bon de commande par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    StockBonCommande.getById(id, (getError, existingStockBonCommande) => {
      if (getError) {
        return res.status(500).json({
          error: "Erreur lors de la récupération du stock bon de commande",
        });
      }
      if (!existingStockBonCommande) {
        return res
          .status(404)
          .json({ error: "Stock bon de commande non trouvé" });
      }
      existingStockBonCommande = {
        ...existingStockBonCommande,
        ...updatedData,
      };

      existingStockBonCommande = new StockBonCommande(
        existingStockBonCommande.id,
        existingStockBonCommande.numero_bc,
        existingStockBonCommande.categorie,
        existingStockBonCommande.quantite_achetee,
        existingStockBonCommande.stock_avant_vente,
        existingStockBonCommande.vente,
        existingStockBonCommande.stock_apres_vente,
        existingStockBonCommande.date_rechargement
      );

      existingStockBonCommande.update((updateError) => {
        if (updateError) {
          return res.status(500).json({
            error: "Erreur lors de la mise à jour du stock bon de commande",
          });
        }
        return res.status(200).json(existingStockBonCommande);
      });
    });
  };

  // Supprimer un stock bon de commande par ID
  static delete = (req, res) => {
    const id = req.params.id;
    StockBonCommande.getById(id, (getError, existingStockBonCommande) => {
      if (getError) {
        return res.status(500).json({
          error: "Erreur lors de la récupération du stock bon de commande",
        });
      }
      if (!existingStockBonCommande) {
        return res
          .status(404)
          .json({ error: "Stock bon de commande non trouvé" });
      }
      existingStockBonCommande.delete((deleteError) => {
        if (deleteError) {
          return res.status(500).json({
            error: "Erreur lors de la suppression du stock bon de commande",
          });
        }
        return res.status(204).json();
      });
    });
  };
}

module.exports = StockBonCommandeController;
