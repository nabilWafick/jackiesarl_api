"use strict";

var express = require("express");

var router = express.Router();

var SoldeClientController = require("../../controllers/solde_client/solde_client.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

router.get("/solde-client/:id_client/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-solde-client"), SoldeClientController.getByIdClient);
router.get("/soldes-clients-default/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-solde-client"), SoldeClientController.getAll);
router.get("/soldes-clients/advance-more-important/:startDate?/:endDate?", SoldeClientController.getAllAdvanceMoreImportant);
router.get("/soldes-clients/advance-less-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-solde-client"), SoldeClientController.getAllAdvanceLessImportant);
router.get("/soldes-clients/debt-more-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-solde-client"), SoldeClientController.getAllDebtsMoreImportant);
router.get("/soldes-clients/debt-less-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-solde-client"), SoldeClientController.getAllDebtsLessImportant);
module.exports = router;