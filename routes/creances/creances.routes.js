const express = require('express');
const router = express.Router();
const CreancesController = require('../../controllers/creances/creances.controller');

// Routes pour la table `creances`
router.post('/creances', CreancesController.create);
router.get('/creances/:id', CreancesController.getById);
router.get('/creances/', CreancesController.getAll);
router.put('/creances/:id', CreancesController.update);
router.delete('/creances/:id', CreancesController.delete);

module.exports = router;
