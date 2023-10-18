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
router.get("/paiement-client/:id", PaiementClientController.getById);
router.get("/paiement-client/", PaiementClientController.getAll);
router.get("/paiement-client/client/:id_client", PaiementClientController.getAllOfClient);
router.put("/paiement-client/:id", upload.single("bordereau"), PaiementClientController.update);
router["delete"]("/paiement-client/:id", PaiementClientController["delete"]);
module.exports = router;