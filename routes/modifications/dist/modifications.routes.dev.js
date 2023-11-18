"use strict";

var express = require("express");

var router = express.Router();

var ModificationsController = require("../../controllers/modifications/modifications.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware"); // Routes pour la table `modifications`


router.post("/modifications", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-modification"), ModificationsController.create);
router.get("/modification/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-modification"), ModificationsController.getById);
router.get("/modifications-default/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-modification"), ModificationsController.getAll);
router.put("/modifications/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-modification"), ModificationsController.update);
router["delete"]("/modifications/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-modification"), ModificationsController["delete"]);
module.exports = router;