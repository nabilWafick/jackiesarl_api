const express = require('express');
const router = express.Router();
const AchatEntrepriseController = require('../../controllers/achat_entreprise/achat_entreprise.controller');

// Routes pour la table `achat_entreprise`
router.post('/achat-entreprise', AchatEntrepriseController.create);
router.get('/achat-entreprise/:bon_commande', AchatEntrepriseController.getByBonCommande);
router.get('/achat-entreprise/', AchatEntrepriseController.getAll);
router.put('/achat-entreprise/:bon_commande', AchatEntrepriseController.update);
router.delete('/achat-entreprise/:bon_commande', AchatEntrepriseController.delete);

module.exports = router;
