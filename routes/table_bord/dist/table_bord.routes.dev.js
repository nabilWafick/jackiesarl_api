"use strict";

var express = require("express");

var router = express.Router();

var TableBordController = require("../../controllers/table_bord/table_bord.controller");

router.get("/table-bord/total-paiements-hebdomadaire/", TableBordController.getWeekDailyPayments);
router.get("/table-bord/total-clients-inscrits-quotidien/:isToday", TableBordController.getDailyRegisteredCustumersTotal);
router.get("/table-bord/total-ventes-quotidiennes/:isToday", TableBordController.getDailySalesTotal);
router.get("/table-bord/total-achats-entreprise-quotidiens/:isToday", TableBordController.getDailyCompanyPurchases);
router.get("/table-bord/total-commandes-non-traitees-quotidiennes/:isToday", TableBordController.getDailyUntraitedOrdersTotal);
router.get("/table-bord/total-commandes-traitees-quotidiennes/:isToday", TableBordController.getDailyTraitedOrdersTotal);
router.get("/table-bord/total-paiements-banques-quotidiens/:isToday", TableBordController.getDailyPaymentPerBank);
router.get("/table-bord/total-stocks-bon-commande-quotidiens/:isToday", TableBordController.getDailyPurchasesOrdersStockTotal);
router.get("/table-bord/total-avances-creances-quotidiennes/:isToday", TableBordController.getDailyAdvancesDebts);
module.exports = router;