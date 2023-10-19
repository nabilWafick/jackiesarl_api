const AchatEntreprise = require("../../models/achat_entreprise/achat_entreprise.model");
const StockBonCommande = require("../../models/stock_bon_commande/stock_bon_commande.model");

class StockBonCommandeController {
  // Créer un nouveau stock bon de commande
  static create = (req, res) => {
    const stockBonCommandeData = req.body;
    console.log("stock Bon de Commande", stockBonCommandeData);

    AchatEntreprise.getByBonCommande(
      stockBonCommandeData.numero_bc,
      (error, achatEntreprise) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération de l'achat entreprise",
          });
        }
        if (!achatEntreprise) {
          return res
            .status(404)
            .json({ status: 404, error: "Le bon de commande n'hexiste pas" });
        }
        // return res.status(200).json(achatEntreprise);

        // if bon_commande existe dans Achat Entreprise

        // on verifie s'il est parmi Stock Bon Commande
        StockBonCommande.getByBonCommande(
          stockBonCommandeData.numero_bc,
          (error, stockBonCommandes) => {
            if (error) {
              return res
                .status(500)
                .json({
                  status: 500,
                  error:
                    "Erreur lors de la récupération du stock bon de commande",
                });
            }
            if (stockBonCommandes.length == 0) {
              if (
                stockBonCommandeData.stock_initial >
                achatEntreprise.quantite_achetee
              ) {
                return res
                  .status(402)
                  .json({
                    status: 402,
                    error:
                      "La quantité demandée est supérieure à celle disponible",
                  });
              }

              // =================== Instruction Finale  ===================== //
              stockBonCommandeData.categorie = achatEntreprise.categorie;
              stockBonCommandeData.quantite_achetee =
                achatEntreprise.quantite_achetee;
              stockBonCommandeData.stock_avant_vente =
                stockBonCommandeData.stock_initial;
              stockBonCommandeData.vente = 0;
              stockBonCommandeData.stock_apres_vente =
                stockBonCommandeData.stock_initial;

              StockBonCommande.create(
                stockBonCommandeData,
                (error, stockBonCommande) => {
                  if (error) {
                    return res.status(500).json({
                      status: 500,
                      error:
                        "Erreur lors de la création du stock bon de commande",
                    });
                  }
                  return res
                    .status(201)
                    .json({ status: 201, stockBonCommande });
                }
              );
              // ====================== Instruction Finale  ====================== //
            } else {
            }
          }
        );

        // ====================== Instruction Finale  ====================== //
        stockBonCommandeData.categorie = achatEntreprise.categorie;
        stockBonCommandeData.quantite_achetee =
          achatEntreprise.quantite_achetee;
        (stockBonCommandeData.stock_avant_vente =
          stockBonCommandeData.stock_initial),
          (stockBonCommandeData.vente = 0),
          (stockBonCommandeData.stock_apres_vente =
            stockBonCommandeData.stock_initial);

        StockBonCommande.create(
          stockBonCommandeData,
          (error, stockBonCommande) => {
            if (error) {
              return res.status(500).json({
                status: 500,
                error: "Erreur lors de la création du stock bon de commande",
              });
            }
            return res.status(201).json({ status: 201, stockBonCommande });
          }
        );
        // ====================== Instruction Finale  ====================== //
      }
    );
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
        existingStockBonCommande.stock_initial,
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
