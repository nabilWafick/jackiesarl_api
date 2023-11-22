const express = require("express");
const router = express.Router();
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");
const FacturesMECEFController = require("../../controllers/factures_mecef/factures_mecef.controller");

// Routes pour la table `facture-mecef`
router.post(
  "/facture-mecef",
  // AuthenticationMiddleware.authenticate,
  // AuthorisationMiddleware.authorize("ajouter-facture-mecef"),
  FacturesMECEFController.create
);
router.get(
  "/facture-mecef/:id",
  // AuthenticationMiddleware.authenticate,
  //  AuthorisationMiddleware.authorize("lire-facture-mecef"),
  FacturesMECEFController.getById
);
router.get(
  "/factures-mecef-default/:startDate?/:endDate?",
  // AuthenticationMiddleware.authenticate,
  // AuthorisationMiddleware.authorize("lire-facture-mecef"),
  FacturesMECEFController.getAll
);
router.put(
  "/facture-mecef/:id",
  // AuthenticationMiddleware.authenticate,
  // AuthorisationMiddleware.authorize("modifier-facture-mecef"),
  FacturesMECEFController.update
);
router.delete(
  "/facture-mecef/:id",
  // AuthenticationMiddleware.authenticate,
  // AuthorisationMiddleware.authorize("supprimer-facture-mecef"),
  FacturesMECEFController.delete
);

module.exports = router;
