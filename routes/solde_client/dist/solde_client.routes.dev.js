"use strict";

var express = require("express");

var router = express.Router();

var SoldeClientController = require("../../controllers/solde_client/solde_client.controller");

router.get("/solde-client/:id_client/:startDate?/:endDate?", SoldeClientController.getByIdClient);
router.get("/soldes-clients/:startDate?/:endDate?", SoldeClientController.getAll);
module.exports = router;