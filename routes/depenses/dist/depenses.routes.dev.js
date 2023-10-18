"use strict";

var express = require("express");

var router = express.Router();

var DepensesController = require("../../controllers/depenses/depenses.controller");

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var directory = path.resolve(__dirname, "../..");
    var dir = path.join(directory, "/uploads/company/slips/expenses");
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); // Routes pour la table `depenses`

router.post("/depenses", upload.single("piece"), DepensesController.create);
router.get("/depenses/:id", DepensesController.getById);
router.get("/depenses/", DepensesController.getAll);
router.put("/depenses/:id", upload.single("piece"), DepensesController.update);
router["delete"]("/depenses/:id", DepensesController["delete"]);
module.exports = router;