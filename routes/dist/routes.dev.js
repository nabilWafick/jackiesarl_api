"use strict";

var express = require("express");

var router = express.Router();

var achatClientRoutes = require("./achat_client/achat_client.routes");

var achatEntrepriseRoutes = require("./achat_entreprise/achat_entreprise.routes");

var activitesBanqueRoutes = require("./activites_banque/activites_banque.routes");

var activitesDepotRoutes = require("./activites_depot/activites_depot.routes");

var autorisationsRoutes = require("./autorisations/autorisations.routes");

var avanceRoutes = require("./avance/avance.routes");

var brouillardRoutes = require("./brouillard/brouillard.routes");

var clientsRoutes = require("./clients/clients.routes");

var commandesRoutes = require("./commandes/commandes.routes");

var creancesRoutes = require("./creances/creances.routes");

var depensesRoutes = require("./depenses/depenses.routes");

var employesRoutes = require("./employes/employes.routes");

var modificationsRoutes = require("./modifications/modifications.routes");

var paiementClientRoutes = require("./paiement_client/paiement_client.routes");

var rapportsRoutes = require("./rapports/rapports.routes");

var remiseChequeClientRoutes = require("./remise_cheque_client/remise_cheque_client.routes");

var soldeCourantRoutes = require("./solde_courant/solde_courant.routes");

var stockBonCommandeRoutes = require("./stock_bon_commande/stock_bon_commande.routes");

var stockCamionRoutes = require("./stock_camion/stock_camion.routes");

var openFileRoute = require("./open_file/open_file.routes");

router.use("/", achatClientRoutes);
router.use("/", achatEntrepriseRoutes);
router.use("/", activitesBanqueRoutes);
router.use("/", activitesDepotRoutes);
router.use("/", autorisationsRoutes);
router.use("/", avanceRoutes);
router.use("/", brouillardRoutes);
router.use("/", clientsRoutes);
router.use("/", commandesRoutes);
router.use("/", creancesRoutes);
router.use("/", depensesRoutes);
router.use("/", employesRoutes);
router.use("/", modificationsRoutes);
router.use("/", paiementClientRoutes);
router.use("/", rapportsRoutes);
router.use("/", remiseChequeClientRoutes);
router.use("/", soldeCourantRoutes);
router.use("/", stockBonCommandeRoutes);
router.use("/", stockCamionRoutes);
router.use("/", openFileRoute);
module.exports = router;