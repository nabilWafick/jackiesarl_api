"use strict";

var express = require("express");

var router = express.Router();

var TableBordController = require("../../controllers/table_bord/table_bord.controller");

var AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");

var AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

router.get("/table-bord/total-paiements-hebdomadaire/", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getWeekDailyPayments);
router.get("/table-bord/total-ventes-hebdomadaire/", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getWeekDailySales);
router.get("/table-bord/total-clients-inscrits-quotidien/:isToday", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getDailyRegisteredCustumersTotal);
router.get("/table-bord/total-ventes-quotidiennes/:isToday", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getDailySalesTotal);
router.get("/table-bord/total-achats-entreprise-quotidiens/:isToday", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getDailyCompanyPurchases);
router.get("/table-bord/total-commandes-non-traitees-quotidiennes/:isToday", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getDailyUntraitedOrdersTotal);
router.get("/table-bord/total-commandes-traitees-quotidiennes/:isToday", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getDailyTraitedOrdersTotal);
router.get("/table-bord/total-paiements-banques-quotidiens/:isToday", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getDailyPaymentPerBank);
router.get("/table-bord/total-stocks-bon-commande-quotidiens/:isToday", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getDailyPurchasesOrdersStockTotal);
router.get("/table-bord/total-avances-creances-quotidiennes/:isToday", AuthenticationMiddleware.authenticate, AuthorisationMiddleware.authorize("lire-tableau-bord"), TableBordController.getDailyAdvancesDebts);
module.exports = router;