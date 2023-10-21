"use strict";

var express = require("express");

var router = express.Router();

var ClientsTonnagesController = require("../../controllers/clients_tonnages/clients_tonnages.controller");

router.get("/clients-tonnages/:id_client", ClientsTonnagesController.getByIdClient);
router.get("/clients-tonnages", ClientsTonnagesController.getAll);
module.exports = router;