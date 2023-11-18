const express = require("express");
const router = express.Router();
const StockCamionController = require("../../controllers/stock_camion/stock_camion.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `stock_camion`
router.post(
  "/stock-camion",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-stock-camion"),
  StockCamionController.create
);
router.get(
  "/stock-camion/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-stock-camion"),
  StockCamionController.getById
);
router.get(
  "/stocks-camions-default/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-stock-camion"),
  StockCamionController.getAll
);
router.put(
  "/stock-camion/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-stock-camion"),
  StockCamionController.update
);
router.delete(
  "/stock-camion/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-stock-camion"),
  StockCamionController.delete
);

module.exports = router;
