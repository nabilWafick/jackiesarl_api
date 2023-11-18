"use strict";

var express = require("express");

var router = express.Router();

var ClientsTonnagesController = require("../../controllers/clients_tonnages/clients_tonnages.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

router.get("/clients-tonnages/:id_client", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-client"), ClientsTonnagesController.getByIdClient);
router.get("/clients-tonnages", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-client"), ClientsTonnagesController.getAll);
module.exports = router;