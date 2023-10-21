const express = require("express");
const router = express.Router();
const ClientsTonnagesController = require("../../controllers/clients_tonnages/clients_tonnages.controller");

router.get(
  "/clients-tonnages/:id_client",
  ClientsTonnagesController.getByIdClient
);
router.get("/clients-tonnages", ClientsTonnagesController.getAll);

module.exports = router;
