const express = require("express");
const router = express.Router();
const EmployesController = require("../../controllers/employes/employes.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `employes`
router.post(
  "/employes",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("admin"),
  EmployesController.create
);
router.get(
  "/employes/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("admin"),
  EmployesController.getById
);
router.get(
  "/employes/",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("admin"),
  EmployesController.getAll
);
router.put(
  "/employes/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("admin"),
  EmployesController.update
);
router.delete(
  "/employes/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("admin"),
  EmployesController.delete
);

module.exports = router;
