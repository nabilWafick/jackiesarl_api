const express = require('express');
const router = express.Router();
const BrouillardController = require('../../controllers/brouillard/brouillard.controller');

// Routes pour la table `brouillard`
router.post('/brouillard', BrouillardController.create);
router.get('/brouillard/:id', BrouillardController.getById);
router.get('/brouillard/', BrouillardController.getAll);
router.put('/brouillard/:id', BrouillardController.update);
router.delete('/brouillard/:id', BrouillardController.delete);

module.exports = router;
