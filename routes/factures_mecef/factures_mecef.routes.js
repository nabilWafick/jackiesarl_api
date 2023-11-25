const express = require("express");
const router = express.Router();
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");
const FacturesMECEFController = require("../../controllers/factures_mecef/factures_mecef.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("file from multer destination", file);
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/bills/files/");

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    //  console.log("file from multer filename", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `facture-mecef`
router.post(
  "/facture-mecef",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-facture-mecef"),
  upload.single("fichier"),
  FacturesMECEFController.create
);

router.get(
  "/facture-mecef/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-facture-mecef"),
  FacturesMECEFController.getById
);

router.get(
  "/factures-mecef-default/:startDate?/:endDate?",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("lire-facture-mecef"),
  FacturesMECEFController.getAll
);

router.put(
  "/facture-mecef/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-facture-mecef"),
  upload.single("fichier"),
  FacturesMECEFController.update
);

router.delete(
  "/facture-mecef/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-facture-mecef"),
  FacturesMECEFController.delete
);

module.exports = router;
