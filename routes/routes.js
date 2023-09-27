const express = require('express');
const router = express.Router();

const achatClientRoutes = require('./achat_client/achat_client.routes');
const achatEntrepriseRoutes = require('./achat_entreprise/achat_entreprise.routes');
const activitesBanqueRoutes = require('./activites_banque/activites_banque.routes');
const activitesDepotRoutes = require('./activites_depot/activites_depot.routes');
const autorisationsRoutes = require('./autorisations/autorisations.routes');
const avanceRoutes = require('./avance/avance.routes');
const brouillardRoutes = require('./brouillard/brouillard.routes');
const clientsRoutes = require('./clients/clients.routes');
const commandesRoutes = require('./commandes/commandes.routes');
const creancesRoutes = require('./creances/creances.routes');
const depensesRoutes = require('./depenses/depenses.routes');
const employesRoutes = require('./employes/employes.routes');
const modificationsRoutes = require('./modifications/modifications.routes');
const paiementClientRoutes = require('./paiement_client/paiement_client.routes');
const rapportsRoutes = require('./rapports/rapports.routes');
const remiseChequeClientRoutes = require('./remise_cheque_client/remise_cheque_client.routes');
const soldeCourantRoutes = require('./solde_courant/solde_courant.routes');
const stockBonCommandeRoutes = require('./stock_bon_commande/stock_bon_commande.routes');
const stockCamionRoutes = require('./stock_camion/stock_camion.routes');


// Utiliser les routes pour chaque table
router.use('/achat-client', achatClientRoutes);
router.use('/achat-entreprise', achatEntrepriseRoutes);
router.use('/activites-banque', activitesBanqueRoutes);
router.use('/activites-depot', activitesDepotRoutes);
router.use('/autorisations', autorisationsRoutes);
router.use('/avance', avanceRoutes);
router.use('/brouillard', brouillardRoutes);
router.use('/clients', clientsRoutes);
router.use('/commandes', commandesRoutes);
router.use('/creances', creancesRoutes);
router.use('/depenses', depensesRoutes);
router.use('/employes', employesRoutes);
router.use('/modifications', modificationsRoutes);
router.use('/paiement-client', paiementClientRoutes);
router.use('/rapports', rapportsRoutes);
router.use('/remise-cheque-client', remiseChequeClientRoutes);
router.use('/solde-courant', soldeCourantRoutes);
router.use('/stock-bon-commande', stockBonCommandeRoutes);
router.use('/stock-camion', stockCamionRoutes);

module.exports = router;
