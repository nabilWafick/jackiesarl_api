"use strict";

var express = require("express");

var router = express.Router();

var PaiementClientController = require("../../controllers/paiement_client/paiement_client.controller"); // Routes pour la table `paiement_client`


router.post("/paiement-client", PaiementClientController.create);
router.get("/paiement-client/:id", PaiementClientController.getById);
router.get("/paiement-client/", PaiementClientController.getAll);
router.get("/paiement-client/client/:id_client", PaiementClientController.getAllOfClient);
router.put("/paiement-client/:id", PaiementClientController.update);
router["delete"]("/paiement-client/:id", PaiementClientController["delete"]);
module.exports = router;