const express = require("express");
const router = express.Router();
const RemiseChequeClientController = require("../../controllers/remise_cheque_client/remise_cheque.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

// Routes pour la table `remise_cheque_client`
router.post(
  "/remise-cheque-client",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-remise-cheque-client"),
  RemiseChequeClientController.create
);
router.get(
  "/remise-cheque-client/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getById
);
router.get(
  "/remise-cheques-clients/",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAll
);

router.get(
  "/remise-cheques-client/client-default/:id_client/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClient
);

// ====================== Seniority

router.get(
  "/remise-cheques-client/client/:id_client/old-to-new/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientFromOldToNew
);
router.get(
  "/remise-cheques-client/client/:id_client/new-to-old/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientFromNewToOld
);

// ====================== Importance

router.get(
  "/remise-cheques-client/client/:id_client/most-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientMoreImportant
);
router.get(
  "/remise-cheques-client/client/:id_client/less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientLessImportant
);

// =================Rest

router.get(
  "/remise-cheques-client/client/:id_client/rest-more-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientRestMoreImportant
);
router.get(
  "/remise-cheques-client/client/:id_client/rest-less-important/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientRestLessImportant
);

// ================= Banks

router.get(
  "/remise-cheques-client/client/:id_client/BOA/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientBOABank
);
router.get(
  "/remise-cheques-client/client/:id_client/UBA/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientUBABank
);

router.get(
  "/remise-cheques-client/client/:id_client/NSIA/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientNSIABank
);
router.get(
  "/remise-cheques-client/client/:id_client/BGFI/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientBGFIBank
);

router.get(
  "/remise-cheques-client/client/:id_client/SGB/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientSGBBank
);
router.get(
  "/remise-cheques-client/client/:id_client/Ecobank/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientEcobankBank
);

router.get(
  "/remise-cheques-client/client/:id_client/validated/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientValidated
);
router.get(
  "/remise-cheques-client/client/:id_client/unvalidated/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-remise-cheque-client"),
  RemiseChequeClientController.getAllOfClientUnvalidated
);

router.put(
  "/remise-cheque-client/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-remise-cheque-client"),
  RemiseChequeClientController.update
);
router.delete(
  "/remise-cheque-client/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-remise-cheque-client"),
  RemiseChequeClientController.delete
);

module.exports = router;
