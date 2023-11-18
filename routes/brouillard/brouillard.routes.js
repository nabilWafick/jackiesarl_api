const express = require("express");
const router = express.Router();
const BrouillardController = require("../../controllers/brouillard/brouillard.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `brouillard`
router.post(
  "/brouillard",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-brouillard"),
  BrouillardController.create
);
router.get(
  "/brouillard/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-brouillard"),
  BrouillardController.getById
);
router.get(
  "/brouillards-default/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-brouillard"),
  BrouillardController.getAll
);
router.put(
  "/brouillard/:id/:is_current_stock_increasing",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-brouillard"),
  BrouillardController.update
);
router.delete(
  "/brouillard/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-brouillard"),
  BrouillardController.delete
);

module.exports = router;
