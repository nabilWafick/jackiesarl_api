const express = require("express");
const path = require("path");
const router = express.Router();
const AchatClientController = require("../../controllers/achat_client/achat_client.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/clients/slips/purchases");

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
// Routes pour la table `achat_client`
router.post(
  "/achat-client",
  upload.single("bordereau"),
  AchatClientController.create
);
router.get("/achat-client/:id", AchatClientController.getById);
router.get("/achat-client/", AchatClientController.getAll);
router.get(
  "/achat-client/client/:id_client",
  AchatClientController.getAllOfClient
);
router.put("/achat-client/:id", AchatClientController.update);
router.delete("/achat-client/:id", AchatClientController.delete);

module.exports = router;
