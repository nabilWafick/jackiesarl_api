const express = require("express");
const router = express.Router();
const DepensesController = require("../../controllers/depenses/depenses.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.resolve(__dirname, "../..");
    const dir = path.join(directory, "/uploads/company/slips/expenses");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    //  console.log("file from multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes pour la table `depenses`
router.post(
  "/depenses",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("ajouter-depense"),
  upload.single("piece"),
  DepensesController.create
);
router.get("/depense/:id", DepensesController.getById);
router.get(
  "/depenses-default/:startDate?/:endDate?",
  DepensesController.getAll
);
router.get(
  "/depenses/new-to-old/:startDate?/:endDate?",
  DepensesController.getAllFromNewToOld
);
router.get(
  "/depenses/old-to-new/:startDate?/:endDate?",
  DepensesController.getAllFromOldToNew
);
router.get(
  "/depenses/most-important/:startDate?/:endDate?",
  DepensesController.getAllMostImportant
);
router.get(
  "/depenses/less-important/:startDate?/:endDate?",
  DepensesController.getAllLessImportant
);
router.get(
  "/depenses/unvalidated/:startDate?/:endDate?",
  DepensesController.getAllUnvalidated
);
router.get(
  "/depenses/validated/:startDate?/:endDate?",
  DepensesController.getAllValidated
);
router.put(
  "/depenses/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("modifier-depense"),
  upload.single("piece"),
  DepensesController.update
);
router.delete(
  "/depenses/:id",
  AuthenticationMiddleware.authenticate,
  AuthorisationMiddleware.authorize("supprimer-depense"),
  DepensesController.delete
);

module.exports = router;
