const express = require("express");
const router = express.Router();
const StockBonCommandeController = require("../../controllers/stock_bon_commande/stock_bon_commande.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `stock_bon_commande`
router.post(
  "/stock-bon-commande",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-stock-bon-commande"),
  StockBonCommandeController.create
);
router.get("/stock-bon-commande/:id", StockBonCommandeController.getById);
router.get("/stock-bon-commande/", StockBonCommandeController.getAll);
router.put(
  "/stock-bon-commande/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-stock-bon-commande"),
  StockBonCommandeController.update
);
router.delete(
  "/stock-bon-commande/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-stock-bon-commande"),
  StockBonCommandeController.delete
);

module.exports = router;
