"use strict";

var express = require("express");

var router = express.Router();

var RapportsController = require("../../controllers/rapports/rapports.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var directory = path.resolve(__dirname, "../..");
    var dir = path.join(directory, "/uploads/employees/reports/");
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); // Routes pour la table `rapports`

router.post("/rapports", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-rapport"), upload.single("rapport"), RapportsController.create);
router.get("/rapport/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-rapport"), RapportsController.getById);
router.get("/rapports/", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("admin"), RapportsController.getAll);
router.get("/rapports/employee/:employee_id", // AuthorisationMiddleware.authorize("lire-rapport"),
RapportsController.getAllOfEmployee);
router.put("/rapports/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-rapport"), upload.single("rapport"), RapportsController.update);
router["delete"]("/rapports/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-rapport"), RapportsController["delete"]);
module.exports = router;