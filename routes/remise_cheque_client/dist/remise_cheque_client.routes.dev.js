"use strict";

var express = require("express");

var router = express.Router();

var RemiseChequeClientController = require("../../controllers/remise_cheque_client/remise_cheque.controller"); // Routes pour la table `remise_cheque_client`


router.post("/remise-cheque-client", RemiseChequeClientController.create);
router.get("/remise-cheque-client/:id", RemiseChequeClientController.getById);
router.get("/remise-cheques-clients/", RemiseChequeClientController.getAll);
router.get("/remise-cheques-client/client-default/:id_client/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClient); // ====================== Seniority

router.get("/remise-cheques-client/client/:id_client/old-to-new/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientFromOldToNew);
router.get("/remise-cheques-client/client/:id_client/new-to-old/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientFromNewToOld); // ====================== Importance

router.get("/remise-cheques-client/client/:id_client/most-important/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientMoreImportant);
router.get("/remise-cheques-client/client/:id_client/less-important/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientLessImportant); // =================Rest

router.get("/remise-cheques-client/client/:id_client/rest-more-important/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientRestMoreImportant);
router.get("/remise-cheques-client/client/:id_client/rest-less-important/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientRestLessImportant); // ================= Banks

router.get("/remise-cheques-client/client/:id_client/BOA/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientBOABank);
router.get("/remise-cheques-client/client/:id_client/UBA/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientUBABank);
router.get("/remise-cheques-client/client/:id_client/NSIA/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientNSIABank);
router.get("/remise-cheques-client/client/:id_client/BGFI/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientBGFIBank);
router.get("/remise-cheques-client/client/:id_client/SGB/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientSGBBank);
router.get("/remise-cheques-client/client/:id_client/Ecobank/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientEcobankBank);
router.get("/remise-cheques-client/client/:id_client/validated/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientValidated);
router.get("/remise-cheques-client/client/:id_client/unvalidated/:startDate?/:endDate?", RemiseChequeClientController.getAllOfClientUnvalidated);
router.put("/remise-cheque-client/:id", RemiseChequeClientController.update);
router["delete"]("/remise-cheque-client/:id", RemiseChequeClientController["delete"]);
module.exports = router;