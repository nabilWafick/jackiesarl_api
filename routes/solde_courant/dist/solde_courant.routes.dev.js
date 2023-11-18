"use strict";

var express = require("express");

var router = express.Router();

var SoldeCourantController = require("../../controllers/solde_courant/solde_courant.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware"); // Routes pour la table `solde_courant`


router.post("/solde-courant", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-solde-courant"), SoldeCourantController.create);
router.get("/solde-courant/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-solde-courant"), SoldeCourantController.getById);
router.get("/soldes-courants/", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-solde-courant"), SoldeCourantController.getAll);
router.put("/solde-courant/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-solde-courant"), SoldeCourantController.update);
router["delete"]("/solde-courant/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-solde-courant"), SoldeCourantController["delete"]);
module.exports = router;