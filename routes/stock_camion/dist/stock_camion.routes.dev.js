"use strict";

var express = require("express");

var router = express.Router();

var StockCamionController = require("../../controllers/stock_camion/stock_camion.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware"); // Routes pour la table `stock_camion`


router.post("/stock-camion", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-stock-camion"), StockCamionController.create);
router.get("/stock-camion/:id", StockCamionController.getById);
router.get("/stocks-camions-default/:startDate?/:endDate?", StockCamionController.getAll);
router.put("/stock-camion/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-stock-camion"), StockCamionController.update);
router["delete"]("/stock-camion/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-stock-camion"), StockCamionController["delete"]);
module.exports = router;