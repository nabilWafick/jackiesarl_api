const express = require("express");
const router = express.Router();
const ClientsController = require("../../controllers/clients/clients.controller");

// Routes pour la table `clients`
router.post("/clients", ClientsController.create);
router.get("/client/:id", ClientsController.getById);
router.get("/clients/search/:name", ClientsController.getAllMatched);
router.get("/clients-default/:startDate?/:endDate?", ClientsController.getAll);
router.get(
  "/clients/alphabetical-order/:startDate?/:endDate?",
  ClientsController.getAllByAlphabeticalOrder
);
router.get(
  "/clients/old-to-new/:startDate?/:endDate?",
  ClientsController.getAllFromOldToNew
);
router.get(
  "/clients/new-to-old/:startDate?/:endDate?",
  ClientsController.getAllFromNewToOld
);
router.put("/clients/:id", ClientsController.update);
router.delete("/clients/:id", ClientsController.delete);

module.exports = router;
