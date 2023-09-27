const express = require('express');
const router = express.Router();
const DepensesController = require('../../controllers/depenses/depenses.controller');

// Routes pour la table `depenses`
router.post('/depenses', DepensesController.create);
router.get('/depenses/:id', DepensesController.getById);
router.get('/depenses/', DepensesController.getAll);
router.put('/depenses/:id', DepensesController.update);
router.delete('/depenses/:id', DepensesController.delete);

module.exports = router;
