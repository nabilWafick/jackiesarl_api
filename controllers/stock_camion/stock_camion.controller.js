const StockCamion = require("../../models/stock_camion/stock_camion.model");
const Modifications = require("../../models/modifications/modifications.model");

class StockCamionController {
  // Créer un nouveau stock camion
  static create = (req, res) => {
    const stockCamionData = req.body;
    StockCamion.create(stockCamionData, (error, stockCamion) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création du stock camion",
        });
      }
      return res.status(201).json({ status: 201, stockCamion });
    });
  };

  // Récupérer un stock camion par ID
  static getById = (req, res) => {
    const id = req.params.id;
    StockCamion.getById(id, (error, stockCamion) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du stock camion" });
      }
      if (!stockCamion) {
        return res.status(404).json({ error: "Stock camion non trouvé" });
      }
      return res.status(200).json(stockCamion);
    });
  };

  static getAll = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    StockCamion.getAll(startDate, endDate, (error, stockCamions) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des stocks de camion",
        });
      }
      return res.status(200).json(stockCamions);
    });
  };

  // Mettre à jour un stock camion par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    let previousData = {};
    let newData = {};

    StockCamion.getById(id, (getError, existingStockCamion) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du stock camion",
        });
      }
      if (!existingStockCamion) {
        return res
          .status(404)
          .json({ status: 404, error: "Stock camion non trouvé" });
      }
      previousData = existingStockCamion;

      existingStockCamion = { ...existingStockCamion, ...updatedData };

      newData = existingStockCamion;

      existingStockCamion = new StockCamion(
        existingStockCamion.id,
        existingStockCamion.numero_camion,
        existingStockCamion.categorie,
        existingStockCamion.numero_chauffeur,
        existingStockCamion.numero_bc,
        existingStockCamion.quantite,
        existingStockCamion.date_approvisionnement
      );
      existingStockCamion.update((updateError) => {
        if (updateError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la mise à jour du stock camion",
          });
        }

        Modifications.create(
          {
            modification: `Modification des données d'un stock camion`,
            details: `
              Anciennes données::
              Numéro camion: ${previousData.numero_camion},
              Catégorie: ${previousData.categorie},
              Numéro chauffeur: ${previousData.numero_chauffeur},
              Bon Commande: ${previousData.numero_bc},
              Quantité: ${previousData.quantite}
              a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
              Nouvelles données::
              Numéro camion: ${newData.numero_camion},
              Catégorie: ${newData.categorie},
              Numéro chauffeur: ${newData.numero_chauffeur},
              Bon Commande: ${newData.numero_bc},
              Quantité: ${newData.quantite}
              `,
            id_employe: req.employee.id,
          },
          (error, modification) => {}
        );

        return res.status(200).json({ status: 200, existingStockCamion });
      });
    });
  };

  // Supprimer un stock camion par ID
  static delete = (req, res) => {
    const id = req.params.id;
    StockCamion.getById(id, (getError, existingStockCamion) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du stock camion",
        });
      }
      if (!existingStockCamion) {
        return res
          .status(404)
          .json({ status: 404, error: "Stock camion non trouvé" });
      }
      existingStockCamion.delete((deleteError, id) => {
        if (!id) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression du stock camion" });
        }
        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = StockCamionController;
