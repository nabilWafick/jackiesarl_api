const express = require("express");
const router = express.Router();
const SoldeClientController = require("../../controllers/solde_client/solde_client.controller");

router.get(
  "/solde-client/:id_client/:startDate?/:endDate?",
  SoldeClientController.getByIdClient
);
router.get(
  "/soldes-clients/:startDate?/:endDate?",
  SoldeClientController.getAll
);

module.exports = router;
