const express = require('express');
const router = express.Router();
const ActivitesBanqueController = require('../../controllers/activites_banque/activites_banque.controller');

// Routes pour la table `activites_banque`
router.post('/activites_banque', ActivitesBanqueController.create);
router.get('/activites_banque/:id', ActivitesBanqueController.getById);
router.put('/activites_banque/:id', ActivitesBanqueController.update);
router.delete('/activites_banque/:id', ActivitesBanqueController.delete);

module.exports = router;
