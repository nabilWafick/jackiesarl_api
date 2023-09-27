const express = require('express');
const router = express.Router();
const RapportsController = require('../../controllers/rapports/rapports.controller');
RapportsController
// Routes pour la table `rapports`
router.post('/rapports', RapportsController.create);
router.get('/rapports/:id', RapportsController.getById);
router.put('/rapports/:id', RapportsController.update);
router.delete('/rapports/:id', RapportsController.delete);

module.exports = router;
RapportsController