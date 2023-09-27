const express = require('express');
const router = express.Router();
const SoldeCourantController = require('../../controllers/solde_courant/solde_courant.controller');

// Routes pour la table `solde_courant`
router.post('/solde-courant', SoldeCourantController.create);
router.get('/solde-courant/:id', SoldeCourantController.getById);
router.put('/solde-courant/:id', SoldeCourantController.update);
router.delete('/solde-courant/:id', SoldeCourantController.delete);

module.exports = router;
