const express = require("express");
const router = express.Router();
const AchatEntrepriseController = require("../../controllers/achat_entreprise/achat_entreprise.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/company/slips/purchases");

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `achat_entreprise`
router.post(
  "/achat-entreprise",
  upload.single("bordereau"),
  AchatEntrepriseController.create
);
router.get(
  "/achat-entreprise/:bon_commande",
  AchatEntrepriseController.getByBonCommande
);
router.get("/achat-entreprise/", AchatEntrepriseController.getAll);
router.put(
  "/achat-entreprise/:bon_commande",
  upload.single("bordereau"),
  AchatEntrepriseController.update
);
router.delete(
  "/achat-entreprise/:bon_commande",
  AchatEntrepriseController.delete
);

module.exports = router;
