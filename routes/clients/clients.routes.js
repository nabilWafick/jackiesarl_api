const express = require('express');
const router = express.Router();
const ClientsController = require('../../controllers/clients/clients.controller');

// Routes pour la table `clients`
router.post('/clients', ClientsController.create);
router.get('/clients/:id', ClientsController.getById);
router.get('/clients/', ClientsController.getAll);
router.put('/clients/:id', ClientsController.update);
router.delete('/clients/:id', ClientsController.delete);

module.exports = router;
