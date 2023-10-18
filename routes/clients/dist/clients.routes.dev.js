"use strict";

var express = require("express");

var router = express.Router();

var ClientsController = require("../../controllers/clients/clients.controller"); // Routes pour la table `clients`


router.post("/clients", ClientsController.create);
router.get("/clients/:id", ClientsController.getById);
router.get("/clients/search/:name", ClientsController.getAllMatched);
router.get("/clients/", ClientsController.getAll);
router.put("/clients/:id", ClientsController.update);
router["delete"]("/clients/:id", ClientsController["delete"]);
module.exports = router;