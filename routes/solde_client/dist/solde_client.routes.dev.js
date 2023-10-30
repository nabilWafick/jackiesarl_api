"use strict";

var express = require("express");

var router = express.Router();

var SoldeClientController = require("../../controllers/solde_client/solde_client.controller");

router.get("/solde-client/:id_client/:startDate?/:endDate?", SoldeClientController.getByIdClient);
router.get("/soldes-clients-default/:startDate?/:endDate?", SoldeClientController.getAll);
router.get("/soldes-clients/advance-more-important/:startDate?/:endDate?", SoldeClientController.getAllAdvanceMoreImportant);
router.get("/soldes-clients/advance-less-important/:startDate?/:endDate?", SoldeClientController.getAllAdvanceLessImportant);
router.get("/soldes-clients/debt-more-important/:startDate?/:endDate?", SoldeClientController.getAllDebtsMoreImportant);
router.get("/soldes-clients/debt-less-important/:startDate?/:endDate?", SoldeClientController.getAllDebtsLessImportant);
module.exports = router;