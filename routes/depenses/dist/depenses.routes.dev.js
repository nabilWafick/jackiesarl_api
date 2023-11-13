"use strict";

var express = require("express");

var router = express.Router();

var DepensesController = require("../../controllers/depenses/depenses.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var directory = path.resolve(__dirname, "../..");
    var dir = path.join(directory, "/uploads/company/slips/expenses");
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    //  console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); // Routes pour la table `depenses`

router.post("/depenses", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("ajouter-depense"), upload.single("piece"), DepensesController.create);
router.get("/depense/:id", DepensesController.getById);
router.get("/depenses-default/:startDate?/:endDate?", DepensesController.getAll);
router.get("/depenses/new-to-old/:startDate?/:endDate?", DepensesController.getAllFromNewToOld);
router.get("/depenses/old-to-new/:startDate?/:endDate?", DepensesController.getAllFromOldToNew);
router.get("/depenses/most-important/:startDate?/:endDate?", DepensesController.getAllMostImportant);
router.get("/depenses/less-important/:startDate?/:endDate?", DepensesController.getAllLessImportant);
router.get("/depenses/unvalidated/:startDate?/:endDate?", DepensesController.getAllUnvalidated);
router.get("/depenses/validated/:startDate?/:endDate?", DepensesController.getAllValidated);
router.put("/depenses/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("modifier-depense"), upload.single("piece"), DepensesController.update);
router["delete"]("/depenses/:id", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("supprimer-depense"), DepensesController["delete"]);
module.exports = router;