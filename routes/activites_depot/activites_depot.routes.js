const express = require('express');
const router = express.Router();
const ActivitesDepotController = require('../../controllers/activites_depot/activites_depot.controller');

// Routes pour la table `activites_depot`
router.post('/activites_depot', ActivitesDepotController.create);
router.get('/activites_depot/:id', ActivitesDepotController.getById);
router.put('/activites_depot/:id', ActivitesDepotController.update);
router.delete('/activites_depot/:id', ActivitesDepotController.delete);

module.exports = router;
