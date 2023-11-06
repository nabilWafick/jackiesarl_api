const express = require("express");
const router = express.Router();
const RapportsController = require("../../controllers/rapports/rapports.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/employees/reports/");

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `rapports`
router.post("/rapports", upload.single("rapport"), RapportsController.create);
router.get("/rapport/:id", RapportsController.getById);
router.get("/rapports/", RapportsController.getAll);
router.get(
  "/rapports/employee/:employee_id",
  RapportsController.getAllOfEmployee
);

router.put(
  "/rapports/:id",
  upload.single("rapport"),
  RapportsController.update
);
router.delete("/rapports/:id", RapportsController.delete);

module.exports = router;
RapportsController;
