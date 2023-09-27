const express = require('express');
const router = express.Router();
const AchatClientController = require('../../controllers/achat_client/achat_client.controller');

// Routes pour la table `achat_client`
router.post('/achat-client', AchatClientController.create);
router.get('/achat-client/:id', AchatClientController.getById);
router.get('/achat-client/', AchatClientController.getAll);
router.put('/achat-client/:id', AchatClientController.update);
router.delete('/achat_client/:id', AchatClientController.delete);

module.exports = router;
