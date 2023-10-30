"use strict";

var express = require("express");

var router = express.Router();

var AchatEntrepriseController = require("../../controllers/achat_entreprise/achat_entreprise.controller");

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var directory = path.resolve(__dirname, "../..");
    var dir = path.join(directory, "/uploads/company/slips/purchases");
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); // Routes pour la table `achat_entreprise`

router.post("/achat-entreprise", upload.single("bordereau"), AchatEntrepriseController.create);
router.get("/achat-entreprise/:bon_commande", AchatEntrepriseController.getByBonCommande);
router.get("/achats-entreprise-default/:startDate?/:endDate?", AchatEntrepriseController.getAll);
router.put("/achat-entreprise/:bon_commande", upload.single("bordereau"), AchatEntrepriseController.update);
router["delete"]("/achat-entreprise/:bon_commande", AchatEntrepriseController["delete"]);
module.exports = router;