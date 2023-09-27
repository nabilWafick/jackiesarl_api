const express = require('express');
const router = express.Router();
const ModificationsController = require('../../controllers/modifications/modifications.controller');

// Routes pour la table `modifications`
router.post('/modifications', ModificationsController.create);
router.get('/modifications/:id', ModificationsController.getById);
router.put('/modifications/:id', ModificationsController.update);
router.delete('/modifications/:id', ModificationsController.delete);

module.exports = router;
