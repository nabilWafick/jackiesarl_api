const express = require("express");
const router = express.Router();
const SoldeClientController = require("../../controllers/solde_client/solde_client.controller");

router.get("/solde-client/:id_client", SoldeClientController.getByIdClient);

module.exports = router;
