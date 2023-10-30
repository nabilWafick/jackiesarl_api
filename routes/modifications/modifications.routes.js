const express = require("express");
const router = express.Router();
const ModificationsController = require("../../controllers/modifications/modifications.controller");

// Routes pour la table `modifications`
router.post("/modifications", ModificationsController.create);
router.get("/modification/:id", ModificationsController.getById);
router.get(
  "/modifications-default/:startDate?/:endDate?",
  ModificationsController.getAll
);
router.put("/modifications/:id", ModificationsController.update);
router.delete("/modifications/:id", ModificationsController.delete);

module.exports = router;
