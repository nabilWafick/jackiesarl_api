const express = require('express');
const router = express.Router();
const AvanceController = require('../../controllers/avance/avance.controller');

// Routes pour la table `avance`
router.post('/avance', AvanceController.create);
router.get('/avance/:id', AvanceController.getById);
router.get('/avance/', AvanceController.getAll);
router.put('/avance/:id', AvanceController.update);
router.delete('/avance/:id', AvanceController.delete);

module.exports = router;
