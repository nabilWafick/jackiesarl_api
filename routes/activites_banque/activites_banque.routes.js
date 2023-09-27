const express = require('express');
const router = express.Router();
const ActivitesBanqueController = require('../../controllers/activites_banque/activites_banque.controller');

// Routes pour la table `activites_banque`
router.post('/activites-banque', ActivitesBanqueController.create);
router.get('/activites-banque/:id', ActivitesBanqueController.getById);
router.get('/activites-banque/', ActivitesBanqueController.getAll);
router.put('/activites-banque/:id', ActivitesBanqueController.update);
router.delete('/activites-banque/:id', ActivitesBanqueController.delete);

module.exports = router;
