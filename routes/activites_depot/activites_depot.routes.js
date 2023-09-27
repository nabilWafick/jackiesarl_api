const express = require('express');
const router = express.Router();
const ActivitesDepotController = require('../../controllers/activites_depot/activites_depot.controller');

// Routes pour la table `activites_depot`
router.post('/activites-depot', ActivitesDepotController.create);
router.get('/activites-depot/:id', ActivitesDepotController.getById);
router.get('/activites-depot/', ActivitesDepotController.getAll);
router.put('/activites-depot/:id', ActivitesDepotController.update);
router.delete('/activites-depot/:id', ActivitesDepotController.delete);

module.exports = router;
