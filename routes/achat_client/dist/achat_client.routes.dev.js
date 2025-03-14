"use strict";

var express = require("express");

var router = express.Router();

var AchatClientController = require("../../controllers/achat_client/achat_client.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var directory = path.resolve(__dirname, "../..");
    var dir = path.join(directory, "/uploads/clients/slips/purchases");
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    //  console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); // Routes pour la table `achat_client`

router.post("/achat-client", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-achat-client"), upload.single("bordereau"), AchatClientController.create);
router.get("/achat-client/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getById); // =================== All clients default

router.get("/achats-clients-default/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAll); // ================  Seniority

router.get("/achats-clients/new-to-old/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllFromNewToOld);
router.get("/achats-clients/old-to-new/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllFromOldToNew); // ================= Importance

router.get("/achats-clients/most-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllMostImportant);
router.get("/achats-clients/less-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllLessImportant); // ================= CIM BENIN Importance

router.get("/achats-clients/cim-benin-most-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllCIMBENINMostImportant);
router.get("/achats-clients/cim-benin-less-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllCIMBENINLessImportant); // ================= NOCIBE Importance

router.get("/achats-clients/nocibe-most-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllNOCIBEMostImportant);
router.get("/achats-clients/nocibe-less-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllNOCIBELessImportant); // ====================== Selectionned Client default

router.get("/achats-client/client-default/:id_client/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClient); // ====================== Seniority

router.get("/achats-client/client/:id_client/old-to-new/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClientFromOldToNew);
router.get("/achats-client/client/:id_client/new-to-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClientFromNewToOld); // ====================== Importance

router.get("/achats-client/client/:id_client/most-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClientMostImportant);
router.get("/achats-client/client/:id_client/less-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClientLessImportant); // ================= CIM BENIN Importance

router.get("/achats-client/client/:id_client/cim-benin-most-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClientCIMBENINMostImportant);
router.get("/achats-client/client/:id_client/cim-benin-less-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClientCIMBENINLessImportant); // ================= NOCIBE Importance

router.get("/achats-client/client/:id_client/nocibe-most-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClientNOCIBEMostImportant);
router.get("/achats-client/client/:id_client/nocibe-less-important/:startDate?/:endDate?", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-achat-client"), AchatClientController.getAllOfClientNOCIBELessImportant);
router.put("/achat-client/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-achat-client"), upload.single("bordereau"), AchatClientController.update);
router["delete"]("/achat-client/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-achat-client"), AchatClientController["delete"]);
module.exports = router;