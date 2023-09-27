const express = require('express');
const router = express.Router();
const RemiseChequeClientController = require('../../controllers/remise_cheque_client/remise_cheque.controller');

// Routes pour la table `remise_cheque_client`
router.post('/remise-cheque-client', RemiseChequeClientController.create);
router.get('/remise-cheque-client/:id', RemiseChequeClientController.getById);
router.put('/remise-cheque-client/:id', RemiseChequeClientController.update);
router.delete('/remise-cheque-client/:id', RemiseChequeClientController.delete);

module.exports = router;
