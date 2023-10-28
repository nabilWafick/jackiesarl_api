"use strict";

var express = require("express");

var router = express.Router();

var PaiementClientController = require("../../controllers/paiement_client/paiement_client.controller");

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var directory = path.resolve(__dirname, "../..");
    var dir = path.join(directory, "/uploads/clients/slips/payments");
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); // Routes pour la table `paiement_client`

router.post("/paiement-client", upload.single("bordereau"), PaiementClientController.create);
router.get("/paiement-client/:id", PaiementClientController.getById); // =================== All clients default

router.get("/paiements-clients-default/:startDate?/:endDate?", PaiementClientController.getAll); // ================  Seniority

router.get("/paiements-clients/new-to-old/:startDate?/:endDate?", PaiementClientController.getAllFromNewToOld);
router.get("/paiements-clients/old-to-new/:startDate?/:endDate?", PaiementClientController.getAllFromOldToNew); // ================= Importance

router.get("/paiements-clients/most-important/:startDate?/:endDate?", PaiementClientController.getAllMostImportant);
router.get("/paiements-clients/less-important/:startDate?/:endDate?", PaiementClientController.getAllLessImportant); // ================= CIM BENIN Importance

router.get("/paiements-clients/cim-benin-most-important/:startDate?/:endDate?", PaiementClientController.getAllCIMBENINMostImportant);
router.get("/paiements-clients/cim-benin-less-important/:startDate?/:endDate?", PaiementClientController.getAllCIMBENINLessImportant); // ================= NOCIBE Importance

router.get("/paiements-clients/nocibe-most-important/:startDate?/:endDate?", PaiementClientController.getAllNOCIBEMostImportant);
router.get("/paiements-clients/nocibe-less-important/:startDate?/:endDate?", PaiementClientController.getAllNOCIBELessImportant); // ================== Validation

router.get("/paiements-clients/validated/:startDate?/:endDate?", PaiementClientController.getAllValidated);
router.get("/paiements-clients/unvalidated/:startDate?/:endDate?", PaiementClientController.getAllUnValidated); // ====================== Selectionned Client default

router.get("/paiements-client/client-default/:id_client/:startDate?/:endDate?", PaiementClientController.getAllOfClient); // ====================== Seniority

router.get("/paiements-client/client/:id_client/old-to-new/:startDate?/:endDate?", PaiementClientController.getAllOfClientFromOldToNew);
router.get("/paiements-client/client/:id_client/new-to-important/:startDate?/:endDate?", PaiementClientController.getAllOfClientFromNewToOld); // ====================== Importance

router.get("/paiements-client/client/:id_client/most-important/:startDate?/:endDate?", PaiementClientController.getAllOfClientMostImportant);
router.get("/paiements-client/client/:id_client/less-important/:startDate?/:endDate?", PaiementClientController.getAllOfClientLessImportant); // ================= CIM BENIN Importance

router.get("/paiements-client/client/:id_client/cim-benin-most-important/:startDate?/:endDate?", PaiementClientController.getAllOfClientCIMBENINMostImportant);
router.get("/paiements-client/client/:id_client/cim-benin-less-important/:startDate?/:endDate?", PaiementClientController.getAllOfClientCIMBENINLessImportant); // ================= NOCIBE Importance

router.get("/paiements-client/client/:id_client/nocibe-most-important/:startDate?/:endDate?", PaiementClientController.getAllOfClientNOCIBEMostImportant);
router.get("/paiements-client/client/:id_client/nocibe-less-important/:startDate?/:endDate?", PaiementClientController.getAllOfClientNOCIBELessImportant); // ================= Validation

router.get("/paiements-client/client/:id_client/validated/:startDate?/:endDate?", PaiementClientController.getAllOfClientValidated);
router.get("/paiements-client/client/:id_client/unvalidated/:startDate?/:endDate?", PaiementClientController.getAllOfClientUnvalidated);
/*
router.get("/paiement-client/", PaiementClientController.getAll);
router.get(
  "/paiement-client/client/:id_client",
  PaiementClientController.getAllOfClient
);
*/

router.put("/paiement-client/:id", upload.single("bordereau"), PaiementClientController.update);
router["delete"]("/paiement-client/:id", PaiementClientController["delete"]);
module.exports = router;