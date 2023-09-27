const express = require('express');
const router = express.Router();
const AchatEntrepriseController = require('../../controllers/achat_entreprise/achat_entreprise.controller');

// Routes pour la table `achat_entreprise`
router.post('/achat_entreprise', AchatEntrepriseController.create);
router.get('/achat_entreprise/:bon_commande', AchatEntrepriseController.getByBonCommande);
router.put('/achat_entreprise/:bon_commande', AchatEntrepriseController.update);
router.delete('/achat_entreprise/:bon_commande', AchatEntrepriseController.delete);

module.exports = router;
