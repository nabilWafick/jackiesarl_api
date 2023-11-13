"use strict";

var express = require("express");

var router = express.Router();

var EmployesController = require("../../controllers/employes/employes.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware"); // Routes pour la table `employes`


router.post("/employes", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("admin"), EmployesController.create);
router.get("/employes/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("admin"), EmployesController.getById);
router.get("/employes/", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("admin"), EmployesController.getAll);
router.put("/employes/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("admin"), EmployesController.update);
router["delete"]("/employes/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("admin"), EmployesController["delete"]);
module.exports = router;