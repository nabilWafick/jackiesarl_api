"use strict";

var express = require("express");

var router = express.Router();

var CommandesController = require("../../controllers/commandes/commandes.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware"); // Routes pour la table `commandes`


router.post("/commandes", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-commande"), CommandesController.create);
router.get("/commande/:id", CommandesController.getById);
router.get("/commandes-default/:startDate?/:endDate?", CommandesController.getAll); // ================  Seniority

router.get("/commandes/new-to-old/:startDate?/:endDate?", CommandesController.getAllFromNewToOld);
router.get("/commandes/old-to-new/:startDate?/:endDate?", CommandesController.getAllFromOldToNew); // ================= Importance

router.get("/commandes/most-important/:startDate?/:endDate?", CommandesController.getAllMoreImportant);
router.get("/commandes/less-important/:startDate?/:endDate?", CommandesController.getAllLessImportant); // ================= CIM BENIN Importance

router.get("/commandes/cim-benin-most-important/:startDate?/:endDate?", CommandesController.getAllCIMBENINMoreImportant);
router.get("/commandes/cim-benin-less-important/:startDate?/:endDate?", CommandesController.getAllCIMBENINLessImportant); // ================= NOCIBE Importance

router.get("/commandes/nocibe-most-important/:startDate?/:endDate?", CommandesController.getAllNOCIBEMoreImportant);
router.get("/commandes/nocibe-less-important/:startDate?/:endDate?", CommandesController.getAllNOCIBELessImportant); // ================== Destination

router.get("/commandes/destination/:startDate?/:endDate?", CommandesController.getAllGroupByDestination);
router.get("/commandes/delivered/:startDate?/:endDate?", CommandesController.getAllDelivered);
router.get("/commandes/undelivered/:startDate?/:endDate?", CommandesController.getAllUnDelivered);
router.put("/commandes/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-commande"), CommandesController.update);
router["delete"]("/commandes/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-commande"), CommandesController["delete"]);
module.exports = router;