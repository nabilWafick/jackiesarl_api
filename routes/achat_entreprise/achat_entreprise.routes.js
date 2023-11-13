const express = require("express");
const router = express.Router();
const AchatEntrepriseController = require("../../controllers/achat_entreprise/achat_entreprise.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/company/slips/purchases");

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `achat_entreprise`
router.post(
  "/achat-entreprise",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-achat-entreprise"),
  upload.single("bordereau"),
  AchatEntrepriseController.create
);
router.get(
  "/achat-entreprise/:bon_commande",
  AchatEntrepriseController.getByBonCommande
);
router.get(
  "/achats-entreprise-default/:startDate?/:endDate?",
  AchatEntrepriseController.getAll
);
router.put(
  "/achat-entreprise/:bon_commande",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-achat-entreprise"),
  upload.single("bordereau"),
  AchatEntrepriseController.update
);
router.delete(
  "/achat-entreprise/:bon_commande",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-achat-entreprise"),
  AchatEntrepriseController.delete
);

module.exports = router;
