const express = require("express");
const router = express.Router();
const ActivitesBanqueController = require("../../controllers/activites_banque/activites_banque.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `activites_banque`
router.post(
  "/activites-banque",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-activite-banque"),
  ActivitesBanqueController.create
);
router.get("/activites-banque/:id", ActivitesBanqueController.getById);
router.get("/activites-banque/", ActivitesBanqueController.getAll);
router.get(
  "/activites-banque/banque/:id_banque",
  ActivitesBanqueController.getAllByBanqueID
);
router.put(
  "/activites-banque/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-activite-banque"),
  ActivitesBanqueController.update
);
router.delete(
  "/activites-banque/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-activite-banque"),
  ActivitesBanqueController.delete
);

module.exports = router;
