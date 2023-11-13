const express = require("express");
const router = express.Router();
const ClientsController = require("../../controllers/clients/clients.controller");

const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `clients`
router.post(
  "/clients",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-client"),
  ClientsController.create
);
router.get("/client/:id", ClientsController.getById);
router.get("/clients/search/:name", ClientsController.getAllMatched);
router.get("/clients-default/:startDate?/:endDate?", ClientsController.getAll);
router.get(
  "/clients/alphabetical-order/:startDate?/:endDate?",
  ClientsController.getAllByAlphabeticalOrder
);
router.get(
  "/clients/old-to-new/:startDate?/:endDate?",
  ClientsController.getAllFromOldToNew
);
router.get(
  "/clients/new-to-old/:startDate?/:endDate?",
  ClientsController.getAllFromNewToOld
);
router.put(
  "/clients/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-client"),
  ClientsController.update
);
router.delete(
  "/clients/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-client"),
  ClientsController.delete
);

module.exports = router;
