"use strict";

var express = require("express");

var router = express.Router();

var ActivitesDepotController = require("../../controllers/activites_depot/activites_depot.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware"); // Routes pour la table `activites_depot`


router.post("/activites-depot", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-activite-depot"), ActivitesDepotController.create);
router.get("/activite-depot/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-activite-depot"), ActivitesDepotController.getById);
router.get("/activites-depots/", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-activite-depot"), ActivitesDepotController.getAll);
router.get("/activites-depot/depot-default/:id_depot/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-activite-depot"), ActivitesDepotController.getAllByDepotID);
router.put("/activites-depot/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-activite-depot"), ActivitesDepotController.update);
router["delete"]("/activites-depot/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-activite-depot"), ActivitesDepotController["delete"]);
module.exports = router;