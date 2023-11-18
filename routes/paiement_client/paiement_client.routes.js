const express = require("express");
const router = express.Router();
const PaiementClientController = require("../../controllers/paiement_client/paiement_client.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/clients/slips/payments");

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `paiement_client`
router.post(
  "/paiement-client",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-paiement-client"),
  upload.single("bordereau"),
  PaiementClientController.create
);
router.get(
  "/paiement-client/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getById
);

// =================== All clients default

router.get(
  "/paiements-clients-default/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAll
);

// ================  Seniority

router.get(
  "/paiements-clients/new-to-old/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllFromNewToOld
);
router.get(
  "/paiements-clients/old-to-new/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllFromOldToNew
);

// ================= Importance

router.get(
  "/paiements-clients/most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllMostImportant
);
router.get(
  "/paiements-clients/less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllLessImportant
);

// ================= CIM BENIN Importance

router.get(
  "/paiements-clients/cim-benin-most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllCIMBENINMostImportant
);
router.get(
  "/paiements-clients/cim-benin-less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllCIMBENINLessImportant
);

// ================= NOCIBE Importance

router.get(
  "/paiements-clients/nocibe-most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllNOCIBEMostImportant
);
router.get(
  "/paiements-clients/nocibe-less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllNOCIBELessImportant
);

// ================== Validation

router.get(
  "/paiements-clients/validated/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllValidated
);
router.get(
  "/paiements-clients/unvalidated/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllUnValidated
);

// ====================== Selectionned Client default

router.get(
  "/paiements-client/client-default/:id_client/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClient
);

// ====================== Seniority

router.get(
  "/paiements-client/client/:id_client/old-to-new/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientFromOldToNew
);
router.get(
  "/paiements-client/client/:id_client/new-to-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientFromNewToOld
);

// ====================== Importance

router.get(
  "/paiements-client/client/:id_client/most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientMostImportant
);
router.get(
  "/paiements-client/client/:id_client/less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientLessImportant
);

// ================= CIM BENIN Importance

router.get(
  "/paiements-client/client/:id_client/cim-benin-most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientCIMBENINMostImportant
);
router.get(
  "/paiements-client/client/:id_client/cim-benin-less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientCIMBENINLessImportant
);

// ================= NOCIBE Importance

router.get(
  "/paiements-client/client/:id_client/nocibe-most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientNOCIBEMostImportant
);
router.get(
  "/paiements-client/client/:id_client/nocibe-less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientNOCIBELessImportant
);

// ================= Validation

router.get(
  "/paiements-client/client/:id_client/validated/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientValidated
);
router.get(
  "/paiements-client/client/:id_client/unvalidated/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-paiement-client"),
  PaiementClientController.getAllOfClientUnvalidated
);

/*
router.get("/paiement-client/", PaiementClientController.getAll);
router.get(
  "/paiement-client/client/:id_client",
  PaiementClientController.getAllOfClient
);
*/

router.put(
  "/paiement-client/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-paiement-client"),
  upload.single("bordereau"),
  PaiementClientController.update
);
router.delete(
  "/paiement-client/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-paiement-client"),
  PaiementClientController.delete
);

module.exports = router;
