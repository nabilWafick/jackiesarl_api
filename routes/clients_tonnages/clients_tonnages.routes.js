const express = require("express");
const router = express.Router();
const ClientsTonnagesController = require("../../controllers/clients_tonnages/clients_tonnages.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

router.get(
  "/clients-tonnages/:id_client",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-client"),
  ClientsTonnagesController.getByIdClient
);
router.get(
  "/clients-tonnages",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-client"),
  ClientsTonnagesController.getAll
);

module.exports = router;
