"use strict";

var express = require("express");

var router = express.Router();

var ModificationsController = require("../../controllers/modifications/modifications.controller"); // Routes pour la table `modifications`


router.post("/modifications", ModificationsController.create);
router.get("/modification/:id", ModificationsController.getById);
router.get("/modifications-default/:startDate?/:endDate?", ModificationsController.getAll);
router.put("/modifications/:id", ModificationsController.update);
router["delete"]("/modifications/:id", ModificationsController["delete"]);
module.exports = router;