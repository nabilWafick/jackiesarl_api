"use strict";

var express = require("express");

var router = express.Router();

var SoldeClientController = require("../../controllers/solde_client/solde_client.controller");

router.get("/solde-client/:id_client", SoldeClientController.getByIdClient);
router.get("/solde-client/", SoldeClientController.getAll);
module.exports = router;