const express = require("express");
const router = express.Router();
const ActivitesDepotController = require("../../controllers/activites_depot/activites_depot.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `activites_depot`
router.post(
  "/activites-depot",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-activite-depot"),
  ActivitesDepotController.create
);
router.get("/activite-depot/:id", ActivitesDepotController.getById);
router.get("/activites-depots/", ActivitesDepotController.getAll);
router.get(
  "/activites-depot/depot-default/:id_depot/:startDate?/:endDate?",
  ActivitesDepotController.getAllByDepotID
);
router.put(
  "/activites-depot/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-activite-depot"),
  ActivitesDepotController.update
);
router.delete(
  "/activites-depot/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-activite-depot"),
  ActivitesDepotController.delete
);

module.exports = router;
