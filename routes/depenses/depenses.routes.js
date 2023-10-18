const express = require("express");
const router = express.Router();
const DepensesController = require("../../controllers/depenses/depenses.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/company/slips/expenses");

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `depenses`
router.post("/depenses", upload.single("piece"), DepensesController.create);
router.get("/depenses/:id", DepensesController.getById);
router.get("/depenses/", DepensesController.getAll);
router.put("/depenses/:id", upload.single("piece"), DepensesController.update);
router.delete("/depenses/:id", DepensesController.delete);

module.exports = router;
