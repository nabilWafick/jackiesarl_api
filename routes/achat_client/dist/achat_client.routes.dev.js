"use strict";

var express = require("express");

var path = require("path");

var router = express.Router();

var AchatClientController = require("../../controllers/achat_client/achat_client.controller");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var directory = path.resolve(__dirname, "../..");
    var dir = path.join(directory, "/uploads/clients/slips/purchases");
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); // Routes pour la table `achat_client`

router.post("/achat-client", upload.single("bordereau"), AchatClientController.create);
router.get("/achat-client/:id", AchatClientController.getById);
router.get("/achat-client/", AchatClientController.getAll);
router.get("/achat-client/client/:id_client", AchatClientController.getAllOfClient);
router.put("/achat-client/:id", AchatClientController.update);
router["delete"]("/achat-client/:id", AchatClientController["delete"]);
module.exports = router;