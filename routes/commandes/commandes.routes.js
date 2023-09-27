const express = require('express');
const router = express.Router();
const CommandesController = require('../../controllers/commandes/commandes.controller');

// Routes pour la table `commandes`
router.post('/commandes', CommandesController.create);
router.get('/commandes/:id', CommandesController.getById);
router.get('/commandes/', CommandesController.getAll);
router.put('/commandes/:id', CommandesController.update);
router.delete('/commandes/:id', CommandesController.delete);

module.exports = router;
