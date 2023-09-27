const express = require('express');
const router = express.Router();
const StockBonCommandeController = require('../../controllers/stock_bon_commande/stock_bon_commande.controller');

// Routes pour la table `stock_bon_commande`
router.post('/stock-bon-commande', StockBonCommandeController.create);
router.get('/stock-bon-commande/:id', StockBonCommandeController.getById);
router.put('/stock-bon-commande/:id', StockBonCommandeController.update);
router.delete('/stock-bon-commande/:id', StockBonCommandeController.delete);

module.exports = router;
