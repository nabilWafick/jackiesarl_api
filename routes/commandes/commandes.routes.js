const express = require("express");
const router = express.Router();
const CommandesController = require("../../controllers/commandes/commandes.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `commandes`
router.post(
  "/commandes",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-commande"),
  CommandesController.create
);
router.get(
  "/commande/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getById
);

router.get(
  "/commandes-default/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAll
);

// ================  Seniority

router.get(
  "/commandes/new-to-old/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllFromNewToOld
);
router.get(
  "/commandes/old-to-new/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllFromOldToNew
);

// ================= Importance

router.get(
  "/commandes/most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllMoreImportant
);
router.get(
  "/commandes/less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllLessImportant
);

// ================= CIM BENIN Importance

router.get(
  "/commandes/cim-benin-most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllCIMBENINMoreImportant
);
router.get(
  "/commandes/cim-benin-less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllCIMBENINLessImportant
);

// ================= NOCIBE Importance

router.get(
  "/commandes/nocibe-most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllNOCIBEMoreImportant
);
router.get(
  "/commandes/nocibe-less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllNOCIBELessImportant
);

// ================== Destination

router.get(
  "/commandes/destination/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllGroupByDestination
);

router.get(
  "/commandes/delivered/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllDelivered
);

router.get(
  "/commandes/undelivered/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-commande"),
  CommandesController.getAllUnDelivered
);

router.put(
  "/commandes/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-commande"),
  CommandesController.update
);
router.delete(
  "/commandes/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-commande"),
  CommandesController.delete
);

module.exports = router;
