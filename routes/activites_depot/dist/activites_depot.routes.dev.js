"use strict";

var express = require("express");

var router = express.Router();

var ActivitesDepotController = require("../../controllers/activites_depot/activites_depot.controller"); // Routes pour la table `activites_depot`


router.post("/activites-depot", ActivitesDepotController.create);
router.get("/activite-depot/:id", ActivitesDepotController.getById);
router.get("/activites-depots/", ActivitesDepotController.getAll);
router.get("/activites-depot/depot-default/:id_depot/:startDate?/:endDate?", ActivitesDepotController.getAllByDepotID);
router.put("/activites-depot/:id", ActivitesDepotController.update);
router["delete"]("/activites-depot/:id", ActivitesDepotController["delete"]);
module.exports = router;