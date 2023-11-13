const express = require("express");
const router = express.Router();
const RapportsController = require("../../controllers/rapports/rapports.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/employees/reports/");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `rapports`
router.post(
  "/rapports",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-rapport"),
  upload.single("rapport"),
  RapportsController.create
);

router.get(
  "/rapport/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-rapport"),
  RapportsController.getById
);

router.get(
  "/rapports/",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("admin"),

  RapportsController.getAll
);

router.get(
  "/rapports/employee/:employee_id",
  // AuthorisationMiddleware.authorize("lire-rapport"),
  RapportsController.getAllOfEmployee
);

router.put(
  "/rapports/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-rapport"),
  upload.single("rapport"),
  RapportsController.update
);

router.delete(
  "/rapports/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-rapport"),
  RapportsController.delete
);

module.exports = router;
