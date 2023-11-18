"use strict";

var express = require("express");

var router = express.Router();

var ActivitesBanqueController = require("../../controllers/activites_banque/activites_banque.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware"); // Routes pour la table `activites_banque`


router.post("/activites-banque", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-activite-banque"), ActivitesBanqueController.create);
router.get("/activites-banque/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-activite-banque"), ActivitesBanqueController.getById);
router.get("/activites-banque/", AuthenticationMiddleware.authenticate, ActivitesBanqueController.getAll);
router.get("/activites-banque/banque/:id_banque", AuthorisationMiddleware.authorize("lire-activite-banque"), ActivitesBanqueController.getAllByBanqueID);
router.put("/activites-banque/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-activite-banque"), ActivitesBanqueController.update);
router["delete"]("/activites-banque/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-activite-banque"), ActivitesBanqueController["delete"]);
module.exports = router;