const express = require('express');
const router = express.Router();
const EmployesController = require('../../controllers/employes/employes.controller');

// Routes pour la table `employes`
router.post('/employes', EmployesController.create);
router.get('/employes/:id', EmployesController.getById);
router.get('/employes/', EmployesController.getAll);
router.put('/employes/:id', EmployesController.update);
router.delete('/employes/:id', EmployesController.delete);

module.exports = router;
