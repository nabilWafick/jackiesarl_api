const express = require('express');
const router = express.Router();
const AutorisationsController = require('../../controllers/autorisations/autorisations.controller');

// Routes pour la table `autorisations`
router.post('/autorisations', AutorisationsController.create);
router.get('/autorisations/:id', AutorisationsController.getById);
router.get('/autorisations/', AutorisationsController.getAll);
router.put('/autorisations/:id', AutorisationsController.update);
router.delete('/autorisations/:id', AutorisationsController.delete);

module.exports = router;
