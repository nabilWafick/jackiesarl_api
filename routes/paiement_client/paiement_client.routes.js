const express = require("express");
const router = express.Router();
const PaiementClientController = require("../../controllers/paiement_client/paiement_client.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/clients/slips/payments");

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `paiement_client`
router.post(
  "/paiement-client",
  upload.single("bordereau"),
  PaiementClientController.create
);
router.get("/paiement-client/:id", PaiementClientController.getById);
router.get("/paiement-client/", PaiementClientController.getAll);
router.get(
  "/paiement-client/client/:id_client",
  PaiementClientController.getAllOfClient
);
router.put(
  "/paiement-client/:id",
  upload.single("bordereau"),
  PaiementClientController.update
);
router.delete("/paiement-client/:id", PaiementClientController.delete);

module.exports = router;
