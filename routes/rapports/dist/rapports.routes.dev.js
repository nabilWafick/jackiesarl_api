"use strict";

var express = require("express");

var router = express.Router();

var RapportsController = require("../../controllers/rapports/rapports.controller");

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var directory = path.resolve(__dirname, "../..");
    var dir = path.join(directory, "/uploads/employees/reports/");
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
}); // Routes pour la table `rapports`

router.post("/rapports", upload.single("rapport"), RapportsController.create);
router.get("/rapport/:id", RapportsController.getById);
router.get("/rapports/", RapportsController.getAll);
router.get("/rapports/employee/:employee_id", RapportsController.getAllOfEmployee);
router.put("/rapports/:id", upload.single("rapport"), RapportsController.update);
router["delete"]("/rapports/:id", RapportsController["delete"]);
module.exports = router;
RapportsController;